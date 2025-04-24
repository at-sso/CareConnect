"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Home,
  LogOut,
  UserPlus,
  Settings,
  BarChart,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserCount() {
      try {
        const response = await fetch("/api/admin/users/count");
        const data = await response.json();

        if (response.ok) {
          setUserCount(data.count);
        } else {
          console.error("Error fetching user count:", data.error);
          toast({
            title: "Error",
            description: "Failed to fetch user count",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching user count:", error);
        toast({
          title: "Error",
          description: "Failed to fetch user count",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchUserCount();
  }, [toast]);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-blue-400">Admin Dashboard</div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-400">
          System Overview
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Users</CardTitle>
              <CardDescription>
                Number of registered users in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400 mr-3" />
                <div className="text-3xl font-bold">
                  {loading ? (
                    <div className="h-8 w-16 bg-gray-700 animate-pulse rounded"></div>
                  ) : (
                    userCount
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* You can add more cards here for other metrics */}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-blue-400">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
              asChild
            >
              <Link href="/admin/users">
                <Users className="mr-2 h-5 w-5" />
                View All Users
              </Link>
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 flex items-center justify-center"
              asChild
            >
              <Link href="/admin/users/new">
                <UserPlus className="mr-2 h-5 w-5" />
                Add New User
              </Link>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 flex items-center justify-center">
              <Settings className="mr-2 h-5 w-5" />
              System Settings
            </Button>
            <Button className="bg-amber-600 hover:bg-amber-700 flex items-center justify-center">
              <BarChart className="mr-2 h-5 w-5" />
              View Reports
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Admin Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
