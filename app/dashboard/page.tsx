import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth"
import { EnhancedDashboard } from "../../components/dashboard/enhanced-dashboard"
import { getMockData } from "../../lib/db-fallback"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // Usar sempre dados mock no EasyPanel
  const mockCandidates = getMockData("candidates")
  const mockProjects = getMockData("projects")
  const mockCompanies = getMockData("companies")

  const candidatesCount = mockCandidates.length
  const pendingCount = mockCandidates.filter((c) => c.status === "PENDING").length
  const completedCount = mockCandidates.filter((c) => c.status === "COMPLETED").length
  const recentCandidates = mockCandidates.slice(0, 5)

  const dashboardData = {
    metrics: {
      totalCandidates: candidatesCount,
      pendingAssessments: pendingCount,
      completedAssessments: completedCount,
      completionRate: candidatesCount > 0 ? Math.round((completedCount / candidatesCount) * 100) : 0,
    },
    recentCandidates,
    projects: mockProjects,
    companies: mockCompanies,
    user: session?.user,
  }

  return <EnhancedDashboard data={dashboardData} />
}
