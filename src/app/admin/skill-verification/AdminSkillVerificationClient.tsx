"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import {
  getSkillVerificationQueue,
  getSubmissionDetail,
  approveSubmission,
  rejectSubmission,
  saveOverrideScore,
  getSkillVerificationConfig,
  updateSkillVerificationConfig,
  type Submission,
  type SkillVerificationConfig,
  type SkillRole,
  type QueueQueryParams,
} from "@/lib/api";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  XCircle,
  Download,
  ExternalLink,
  Edit3,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  ShieldQuestion,
} from "lucide-react";

export default function AdminSkillVerificationClient() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [config, setConfig] = useState<SkillVerificationConfig | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [submissionDetail, setSubmissionDetail] = useState<any>(null);
  const [overrideFeedback, setOverrideFeedback] = useState<string>("");
  const [overrideScore, setOverrideScore] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<{ type: "approve" | "reject"; id: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [filters, setFilters] = useState<QueueQueryParams>({
    page: 1,
    limit: 10,
    sortBy: "submittedAt",
    sortOrder: "desc",
  });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 0 });

  // Check if user is admin or superadmin
  useEffect(() => {
    if (user && !["ADMIN", "SUPERADMIN"].includes(user.role)) {
      window.location.href = "/dashboard";
    }
  }, [user]);

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [queueRes, configRes] = await Promise.all([
        getSkillVerificationQueue(filters),
        getSkillVerificationConfig(),
      ]);

      if (queueRes.data) {
        setSubmissions(queueRes.data.items);
        setPagination(queueRes.data.pagination);
      }
      if (configRes.data) {
        setConfig(configRes.data);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setToast({ message: "Failed to load data", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Get score color class
  const getScoreColor = (score: number | undefined) => {
    if (!config || !score) return "text-gray-500 bg-gray-100";
    if (score > config.autoApproveThreshold)
      return "text-green-700 bg-green-100 border-green-200";
    if (score >= config.autoFailThreshold)
      return "text-yellow-700 bg-yellow-100 border-yellow-200";
    return "text-red-700 bg-red-100 border-red-200";
  };

  // Get score icon
  const getScoreIcon = (score: number | undefined) => {
    if (!config || !score) return <ShieldQuestion className="w-4 h-4" />;
    if (score > config.autoApproveThreshold)
      return <ShieldCheck className="w-4 h-4 text-green-600" />;
    if (score >= config.autoFailThreshold)
      return <ShieldQuestion className="w-4 h-4 text-yellow-600" />;
    return <ShieldAlert className="w-4 h-4 text-red-600" />;
  };

  // Fetch submission detail
  const handleSelectSubmission = async (submission: Submission) => {
    setSelectedSubmission(submission);
    setOverrideFeedback(submission.evaluationResult?.aiFeedback || "");
    setOverrideScore(submission.evaluationResult?.adminOverrideScore || null);
    try {
      const res = await getSubmissionDetail(submission.id);
      if (res.data) {
        setSubmissionDetail(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch submission detail:", error);
    }
  };

  // Handle config update
  const handleConfigUpdate = async (key: keyof SkillVerificationConfig, value: number) => {
    if (!config) return;
    try {
      const newConfig = { ...config, [key]: value };
      setConfig(newConfig);
      await updateSkillVerificationConfig({ [key]: value });
      setToast({ message: "Config updated successfully", type: "success" });
    } catch (error) {
      console.error("Failed to update config:", error);
      setToast({ message: "Failed to update config", type: "error" });
    }
  };

  // Handle override
  const handleOverride = async () => {
    if (!selectedSubmission) return;
    try {
      await saveOverrideScore(selectedSubmission.id, {
        adminOverrideScore: overrideScore || undefined,
        adminFeedback: overrideFeedback || undefined,
      });
      setToast({ message: "Override saved", type: "success" });
      fetchData();
    } catch (error) {
      console.error("Failed to save override:", error);
      setToast({ message: "Failed to save override", type: "error" });
    }
  };

  // Handle approve
  const handleApprove = async () => {
    if (!showConfirmModal || !user || !user.id) return;
    try {
      await approveSubmission(user.id, showConfirmModal.id);
      setToast({ message: "Submission approved successfully", type: "success" });
      setShowConfirmModal(null);
      setSelectedSubmission(null);
      fetchData();
    } catch (error) {
      console.error("Failed to approve submission:", error);
      setToast({ message: "Failed to approve submission", type: "error" });
    }
  };

  // Handle reject
  const handleReject = async () => {
    if (!showConfirmModal || !user || !user.id) return;
    try {
      await rejectSubmission(user.id, showConfirmModal.id);
      setToast({ message: "Submission rejected successfully", type: "success" });
      setShowConfirmModal(null);
      setSelectedSubmission(null);
      fetchData();
    } catch (error) {
      console.error("Failed to reject submission:", error);
      setToast({ message: "Failed to reject submission", type: "error" });
    }
  };

  // Format role name
  const formatRole = (role: string) => {
    return role.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#C2185B]" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header with Config Controls */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Skill Verification Queue
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              Review and action pending skill verification submissions
            </p>
          </div>
        </div>

        {/* Config Controls */}
        {config && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Pass Threshold
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.passThreshold}
                  onChange={(e) =>
                    handleConfigUpdate("passThreshold", parseInt(e.target.value) || 0)
                  }
                  className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
                <span className="text-zinc-500 dark:text-zinc-400">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Auto-Approve Threshold
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.autoApproveThreshold}
                  onChange={(e) =>
                    handleConfigUpdate("autoApproveThreshold", parseInt(e.target.value) || 0)
                  }
                  className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
                <span className="text-zinc-500 dark:text-zinc-400">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Auto-Fail Threshold
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={config.autoFailThreshold}
                  onChange={(e) =>
                    handleConfigUpdate("autoFailThreshold", parseInt(e.target.value) || 0)
                  }
                  className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
                <span className="text-zinc-500 dark:text-zinc-400">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Max Attempts
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={config.maxAttempts}
                  onChange={(e) =>
                    handleConfigUpdate("maxAttempts", parseInt(e.target.value) || 1)
                  }
                  className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters and Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Table Area */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-sm border border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Role
                </label>
                <select
                  value={filters.role || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      role: (e.target.value as SkillRole) || undefined,
                      page: 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                >
                  <option value="">All Roles</option>
                  <option value="BACKEND_ENGINEER">Backend Engineer</option>
                  <option value="FRONTEND_ENGINEER">Frontend Engineer</option>
                  <option value="MARKETING">Marketing</option>
                  <option value="BRANDING">Branding</option>
                  <option value="GRAPHICS_DESIGN">Graphics Design</option>
                  <option value="VIRTUAL_ASSISTANT">Virtual Assistant</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Score Band
                </label>
                <select
                  value={filters.scoreBand || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      scoreBand:
                        (e.target.value as "AUTO_APPROVE" | "GRAY_ZONE" | "AUTO_FAIL") ||
                        undefined,
                      page: 1,
                    })
                  }
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                >
                  <option value="">All Scores</option>
                  <option value="AUTO_APPROVE">Auto Approve (&gt;85%)</option>
                  <option value="GRAY_ZONE">Gray Zone (50-85%)</option>
                  <option value="AUTO_FAIL">Auto Fail (&lt;50%)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ page: 1, limit: 10, sortBy: "submittedAt", sortOrder: "desc" })}
                  className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      AI Score
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {submissions.length > 0 ? (
                    submissions.map((submission) => (
                      <tr
                        key={submission.id}
                        onClick={() => handleSelectSubmission(submission)}
                        className={`cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors ${
                          selectedSubmission?.id === submission.id
                            ? "bg-zinc-50 dark:bg-zinc-800/50"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#C2185B]/10 flex items-center justify-center text-[#C2185B] font-medium">
                              {submission.user.profile?.firstName?.charAt(0) || "U"}
                              {submission.user.profile?.lastName?.charAt(0) || ""}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                                {submission.user.profile?.firstName || "Unknown"}{" "}
                                {submission.user.profile?.lastName || ""}
                              </div>
                              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                {submission.user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-zinc-900 dark:text-white">
                            {formatRole(submission.role)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(
                                submission.evaluationResult?.aiScore
                              )}`}
                            >
                              {getScoreIcon(submission.evaluationResult?.aiScore)}
                              <span className="ml-1">
                                {submission.evaluationResult?.aiScore || "N/A"}%
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {new Date(submission.submittedAt || submission.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            {submission.submissionType === "GITHUB_PR" ? "GitHub PR" : "PDF Upload"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-12 text-center text-zinc-500 dark:text-zinc-400"
                      >
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-12 h-12 text-zinc-300 mb-4" />
                          <h3 className="text-lg font-medium text-zinc-900 dark:text-white mb-2">
                            No pending submissions
                          </h3>
                          <p className="text-sm">
                            All skill verification submissions have been reviewed!
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {submissions.length > 0 && (
              <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="text-sm text-zinc-500 dark:text-zinc-400">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{" "}
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
                  {pagination.total} submissions
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilters({ ...filters, page: Math.max(1, pagination.page - 1) })}
                    disabled={pagination.page === 1}
                    className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 px-2">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setFilters({
                        ...filters,
                        page: Math.min(pagination.totalPages, pagination.page + 1),
                      })
                    }
                    disabled={pagination.page === pagination.totalPages}
                    className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submission Detail Panel */}
        {selectedSubmission && (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Review Submission
              </h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Candidate Info */}
            <div className="mb-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#C2185B]/10 flex items-center justify-center text-[#C2185B] font-medium text-lg">
                  {selectedSubmission.user.profile?.firstName?.charAt(0) || "U"}
                  {selectedSubmission.user.profile?.lastName?.charAt(0) || ""}
                </div>
                <div className="ml-3">
                  <div className="font-medium text-zinc-900 dark:text-white">
                    {selectedSubmission.user.profile?.firstName || "Unknown"}{" "}
                    {selectedSubmission.user.profile?.lastName || ""}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formatRole(selectedSubmission.role)} • Attempt #{selectedSubmission.roleAttemptNumber}
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Content */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wide">
                Submission
              </h3>

              {selectedSubmission.submissionType === "GITHUB_PR" ? (
                <a
                  href={selectedSubmission.githubPrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span className="flex-1 truncate">View GitHub Pull Request</span>
                </a>
              ) : (
                <a
                  href={selectedSubmission.pdfFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span className="flex-1 truncate">Download PDF Submission</span>
                </a>
              )}
            </div>

            {/* AI Feedback */}
            {selectedSubmission.evaluationResult?.aiFeedback && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wide mb-3">
                  AI Feedback
                </h3>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                    {selectedSubmission.evaluationResult.aiFeedback}
                  </p>
                </div>
              </div>
            )}

            {/* AI Rubric Breakdown */}
            {selectedSubmission.evaluationResult?.aiRubricBreakdown && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wide mb-3">
                  AI Score Breakdown
                </h3>
                <div className="space-y-3">
                  {Object.entries(selectedSubmission.evaluationResult.aiRubricBreakdown).map(
                    ([criterion, score]) => (
                      <div key={criterion} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-zinc-600 dark:text-zinc-400">
                            {criterion.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="font-medium text-zinc-900 dark:text-white">
                            {score}%
                          </span>
                        </div>
                        <div className="h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#C2185B]"
                            style={{ width: `${Math.min(100, score)}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Admin Override */}
            <div className="space-y-4 mb-6">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wide">
                Admin Override
              </h3>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Override Score (0-100)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={overrideScore || ""}
                    onChange={(e) =>
                      setOverrideScore(
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                    className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  />
                  <span className="text-zinc-500 dark:text-zinc-400">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Override Feedback
                </label>
                <textarea
                  value={overrideFeedback}
                  onChange={(e) => setOverrideFeedback(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  placeholder="Enter feedback for the candidate..."
                />
              </div>
              <button
                onClick={handleOverride}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                Save Override
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  setShowConfirmModal({ type: "reject", id: selectedSubmission.id })
                }
                className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
              >
                <XCircle className="w-5 h-5" />
                Reject
              </button>
              <button
                onClick={() =>
                  setShowConfirmModal({ type: "approve", id: selectedSubmission.id })
                }
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5" />
                Approve
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 max-w-md w-full shadow-xl border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              {showConfirmModal.type === "approve"
                ? "Approve Submission?"
                : "Reject Submission?"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {showConfirmModal.type === "approve"
                ? "This will approve the submission and grant a badge to the candidate. This action cannot be undone."
                : "This will reject the submission and may place the candidate in cooldown. This action cannot be undone."}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="flex-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={showConfirmModal.type === "approve" ? handleApprove : handleReject}
                className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  showConfirmModal.type === "approve"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {showConfirmModal.type === "approve" ? "Yes, Approve" : "Yes, Reject"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg border ${
            toast.type === "success"
              ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
              : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
          }`}
        >
          {toast.message}
        </div>
      )}
    </div>
  );
}
