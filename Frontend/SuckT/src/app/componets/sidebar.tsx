"use client"

import { Home, User, CheckSquare, Settings, LogOut, ChevronRight } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      description: "Dashboard overview",
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
      description: "Manage your account",
    },
    {
      name: "Tasks",
      href: "/tasks",
      icon: CheckSquare,
      description: "View and manage tasks",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      description: "App preferences",
    },
  ]

  const handleLinkClick = () => {
    // Close sidebar when a link is clicked (especially useful on mobile)
    onClose()
  }

  return (
    <>
      {/* Backdrop overlay - only visible on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-80 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">John Doe</h3>
                <p className="text-sm text-gray-500">john.doe@example.com</p>
              </div>
            </div>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="group flex items-center justify-between p-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-md bg-gray-100 group-hover:bg-gray-200 transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.description}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
                </a>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLinkClick}
              className="group flex items-center space-x-3 w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <div className="p-2 rounded-md bg-red-100 group-hover:bg-red-200 transition-colors duration-200">
                <LogOut className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-medium">Logout</div>
                <div className="text-sm text-red-500">Sign out of your account</div>
              </div>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
