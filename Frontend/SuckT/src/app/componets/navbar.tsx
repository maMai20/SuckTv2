"use client"

import { Menu, X, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

export function Navbar({ isSidebarOpen, toggleSidebar }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left section - Hamburger and Logo */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hover:bg-gray-100 transition-colors duration-200"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          >
            {isSidebarOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
          </Button>

          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </div>

        {/* Center section - Title (hidden on mobile) */}
        <div className="hidden md:block">
          <h2 className="text-lg font-medium text-gray-700">Welcome back!</h2>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-gray-100">
            <User className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>
    </header>
  )
}
