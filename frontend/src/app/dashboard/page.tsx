"use client";

import { useState, useEffect, useMemo } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface Trial {
  title: string;
  hash: string;
  status: string;
  bias_risk?: string;
}

interface LedgerData {
  [key: string]: Trial;
}

export default function DashboardPage() {
  const [ledgerData, setLedgerData] = useState<LedgerData>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch ledger data from backend
  const fetchLedger = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/all-trials");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = (await res.json()) as LedgerData;
      setLedgerData(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError("Connection to API failed. Make sure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchLedger();
    const interval = setInterval(() => void fetchLedger(), 5000);
    return () => clearInterval(interval);
  }, []);

  // Filter trials based on search query
  const filteredTrials = useMemo(() => {
    const entries = Object.entries(ledgerData);
    if (!searchQuery.trim()) return entries;
    const query = searchQuery.toLowerCase();
    return entries.filter(
      ([id, trial]) =>
        id.toLowerCase().includes(query) ||
        trial.title.toLowerCase().includes(query)
    );
  }, [ledgerData, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const entries = Object.entries(ledgerData);
    const total = entries.length;
    const verified = entries.filter(([, t]) => t.status === "Verified").length;
    const tampered = entries.filter(([, t]) => t.status === "Tampered").length;
    const highRisk = entries.filter(
      ([, t]) => t.bias_risk === "high risk"
    ).length;
    return { total, verified, tampered, highRisk };
  }, [ledgerData]);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ["NCT ID", "Title", "Hash", "Bias Risk", "Status"];
    const rows = Object.entries(ledgerData).map(([id, trial]) => [
      id,
      `"${trial.title.replace(/"/g, '""')}"`,
      trial.hash,
      trial.bias_risk ?? "low risk",
      trial.status,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join(
      "\n"
    );
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ledger_export.csv";
    link.click();
  };

  // Copy hash to clipboard
  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-8 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                MED-BLOCK-GUARD
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Clinical Trial Integrity Ledger
              </p>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-xs text-gray-500">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <Button
                onClick={() => void fetchLedger()}
                variant="outline"
                className="border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
              >
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-8">
        {/* Statistics Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Trials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{stats.total}</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Verified
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-white">{stats.verified}</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Tampered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-500">{stats.tampered}</p>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                High Risk (ML)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-yellow-500">
                {stats.highRisk}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Actions Bar */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Input
              type="text"
              placeholder="Search by NCT ID or trial title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-white/20 bg-white/5 text-white placeholder:text-gray-500 focus:border-white focus:ring-white"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={exportToCSV}
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white hover:text-black"
            >
              Export CSV
            </Button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <Card className="mb-6 border-red-500/50 bg-red-500/10">
            <CardContent className="py-4">
              <p className="text-red-400">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          </div>
        )}

        {/* Trials Table */}
        {!isLoading && (
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-gray-400">NCT ID</TableHead>
                    <TableHead className="text-gray-400">Trial Title</TableHead>
                    <TableHead className="text-gray-400">
                      Integrity Hash
                    </TableHead>
                    <TableHead className="text-gray-400">
                      Bias Risk (ML)
                    </TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrials.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="py-8 text-center text-gray-500"
                      >
                        {searchQuery
                          ? "No trials match your search"
                          : "No trials in ledger"}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrials.map(([id, trial]) => (
                      <TableRow
                        key={id}
                        className="border-white/10 hover:bg-white/5"
                      >
                        <TableCell className="font-mono text-sm text-white">
                          {id}
                        </TableCell>
                        <TableCell className="max-w-md truncate text-white">
                          {trial.title}
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => void copyToClipboard(trial.hash)}
                            className="cursor-pointer rounded bg-white/10 px-2 py-1 font-mono text-xs text-gray-300 transition hover:bg-white/20"
                            title="Click to copy full hash"
                          >
                            {trial.hash.substring(0, 16)}...
                          </button>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              trial.bias_risk === "high risk"
                                ? "outline"
                                : "secondary"
                            }
                            className={
                              trial.bias_risk === "high risk"
                                ? "border-yellow-500 text-yellow-500"
                                : "border-white/20 bg-white/10 text-white"
                            }
                          >
                            {trial.bias_risk?.toUpperCase() ?? "LOW RISK"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              trial.status === "Verified"
                                ? "default"
                                : "destructive"
                            }
                            className={
                              trial.status === "Verified"
                                ? "bg-white text-black"
                                : "bg-red-500 text-white"
                            }
                          >
                            {trial.status.toUpperCase()}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
          <p>
            Med-Block-Guard &copy; {new Date().getFullYear()} — Blockchain-backed
            Clinical Trial Integrity System
          </p>
        </footer>
      </div>
    </main>
  );
}
