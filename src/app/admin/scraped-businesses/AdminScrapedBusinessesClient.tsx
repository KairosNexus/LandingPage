"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteAdminScrapedBusiness,
  getAdminScrapedBusinesses,
  type ScrapedBusiness,
  type ScrapedBusinessQueryParams,
} from "@/lib/api";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  Mail,
  RefreshCw,
  Search,
  Trash2,
  Building,
} from "lucide-react";

export default function AdminScrapedBusinessesClient() {
  const [businesses, setBusinesses] = useState<ScrapedBusiness[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [filters, setFilters] = useState<ScrapedBusinessQueryParams>({
    page: 1,
    limit: 20,
    emailStatus: "",
  });
  const [pagination, setPagination] = useState({
    total: 0,
    pageNo: 1,
    pageSize: 20,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [meta, setMeta] = useState({ withEmail: 0, withoutEmail: 0 });

  const queryParams = useMemo(
    () => ({
      ...filters,
      query: filters.query?.trim() || undefined,
      category: filters.category?.trim() || undefined,
      city: filters.city?.trim() || undefined,
      state: filters.state?.trim() || undefined,
      emailStatus: filters.emailStatus || undefined,
    }),
    [filters],
  );

  const fetchBusinesses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAdminScrapedBusinesses(queryParams);
      setBusinesses(response.data?.items || []);
      setPagination(response.pagination);
      setMeta(response.data?.meta || { withEmail: 0, withoutEmail: 0 });
    } catch (error) {
      console.error("Failed to load scraped businesses:", error);
      setToast({ type: "error", message: "Failed to load scraped businesses" });
    } finally {
      setLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  const updateFilter = (key: keyof ScrapedBusinessQueryParams, value: string | number) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
      page: key === "page" ? Number(value) : 1,
    }));
  };

  const handleDelete = async (business: ScrapedBusiness) => {
    const label = business.name || business.website || business.mantaUrl || "this record";
    if (!window.confirm(`Delete ${label}?`)) return;

    try {
      setDeletingId(business.id);
      await deleteAdminScrapedBusiness(business.id);
      setToast({ type: "success", message: "Scraped business deleted" });
      fetchBusinesses();
    } catch (error) {
      console.error("Failed to delete scraped business:", error);
      setToast({ type: "error", message: "Failed to delete scraped business" });
    } finally {
      setDeletingId(null);
    }
  };

  const resetFilters = () => {
    setFilters({ page: 1, limit: 20, emailStatus: "" });
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Scraped Business Data
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Manta records saved in the `ScrapedBusiness` table.
          </p>
        </div>
        <button
          onClick={fetchBusinesses}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Total</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">{pagination.total}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">With Email</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">{meta.withEmail}</p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Without Email</p>
          <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">{meta.withoutEmail}</p>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="grid gap-3 md:grid-cols-[minmax(180px,2fr)_repeat(4,minmax(120px,1fr))_auto]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              value={filters.query || ""}
              onChange={(event) => updateFilter("query", event.target.value)}
              placeholder="Search name, email, website"
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white pl-9 pr-3 text-sm text-zinc-900 outline-none focus:border-[#C2185B] dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
            />
          </label>
          <input
            value={filters.category || ""}
            onChange={(event) => updateFilter("category", event.target.value)}
            placeholder="Category"
            className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#C2185B] dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
          <input
            value={filters.city || ""}
            onChange={(event) => updateFilter("city", event.target.value)}
            placeholder="City"
            className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#C2185B] dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
          <input
            value={filters.state || ""}
            onChange={(event) => updateFilter("state", event.target.value)}
            placeholder="State"
            className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#C2185B] dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          />
          <select
            value={filters.emailStatus || ""}
            onChange={(event) => updateFilter("emailStatus", event.target.value)}
            className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none focus:border-[#C2185B] dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"
          >
            <option value="">All emails</option>
            <option value="with_email">With email</option>
            <option value="without_email">Without email</option>
          </select>
          <button
            onClick={resetFilters}
            className="h-10 rounded-lg px-3 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#C2185B]" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px]">
              <thead className="bg-zinc-50 dark:bg-zinc-800/60">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-500">Business</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-500">Emails</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-500">Phones</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-500">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-zinc-500">Scraped</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {businesses.length ? (
                  businesses.map((business) => (
                    <tr key={business.id} className="align-top">
                      <td className="px-4 py-4">
                        <div className="max-w-xs">
                          <p className="font-medium text-zinc-900 dark:text-white">
                            {business.name || "Unnamed business"}
                          </p>
                          <div className="mt-2 flex flex-col gap-1 text-sm">
                            {business.website && (
                              <a className="inline-flex items-center gap-1 text-[#C2185B] hover:underline" href={business.website} target="_blank" rel="noreferrer">
                                Website <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            {business.mantaUrl && (
                              <a className="inline-flex items-center gap-1 text-zinc-500 hover:underline" href={business.mantaUrl} target="_blank" rel="noreferrer">
                                Manta <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        {business.emails.length ? (
                          <div className="flex max-w-xs flex-wrap gap-1">
                            {business.emails.map((email) => (
                              <a key={email} href={`mailto:${email}`} className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                <Mail className="h-3 w-3" />
                                {email}
                              </a>
                            ))}
                          </div>
                        ) : (
                          <span className="text-sm text-zinc-500">No email found</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                        {business.phones.length ? business.phones.join(", ") : "None"}
                      </td>
                      <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                        {[business.city, business.state, business.country].filter(Boolean).join(", ") || "Unknown"}
                        {business.category && (
                          <span className="mt-1 block text-xs uppercase text-zinc-400">{business.category}</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-zinc-600 dark:text-zinc-300">
                        {new Date(business.lastScrapedAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => handleDelete(business)}
                          disabled={deletingId === business.id}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-600 transition hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          aria-label="Delete scraped business"
                        >
                          {deletingId === business.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center text-zinc-500">
                      No scraped businesses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex flex-col gap-3 border-t border-zinc-200 px-4 py-3 text-sm dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-zinc-500">
            Page {pagination.pageNo} of {Math.max(pagination.totalPages, 1)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateFilter("page", Math.max(1, pagination.pageNo - 1))}
              disabled={!pagination.hasPrevious}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              onClick={() => updateFilter("page", pagination.pageNo + 1)}
              disabled={!pagination.hasNext}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:text-zinc-200"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 rounded-lg border px-4 py-3 text-sm shadow-lg ${
            toast.type === "success"
              ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
