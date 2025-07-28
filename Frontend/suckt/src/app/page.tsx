import { Layout } from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, TrendingUp, Users, Activity, Calendar } from "lucide-react"

export default function HomePage() {
  const quickStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      change: "+8.2%",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Growth Rate",
      value: "23.1%",
      change: "+2.4%",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Events Today",
      value: "47",
      change: "+15.3%",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <Layout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">Monitor your application performance and user activity</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button className="inline-flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs text-green-600 font-medium mt-1">{stat.change} from last month</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes in your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New user registered", time: "2 minutes ago", type: "user" },
                  { action: "Payment processed", time: "5 minutes ago", type: "payment" },
                  { action: "System backup completed", time: "1 hour ago", type: "system" },
                  { action: "New feature deployed", time: "3 hours ago", type: "deployment" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "user"
                          ? "bg-blue-500"
                          : activity.type === "payment"
                            ? "bg-green-500"
                            : activity.type === "system"
                              ? "bg-yellow-500"
                              : "bg-purple-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Create Task", description: "Add a new task" },
                  { name: "Invite User", description: "Send invitation" },
                  { name: "Generate Report", description: "Export analytics" },
                  { name: "System Settings", description: "Configure app" },
                ].map((action, index) => (
                  <Button key={index} variant="outline" className="w-full justify-start h-auto p-4 bg-transparent">
                    <div className="text-left">
                      <div className="font-medium">{action.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Demo Instructions */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900">Try the Sidebar!</h3>
                <p className="text-blue-800 mt-1">
                  Click the hamburger menu (☰) in the top-left corner to open the sliding sidebar panel. It works
                  smoothly on both desktop and mobile devices with keyboard support (press Escape to close).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
