"use client";
import React, { useState } from 'react';
import * as echarts from 'echarts';
import { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const App: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Placement Drive",
      description: "Google is conducting campus placements next week",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      title: "Profile Update Required",
      description: "Please update your resume before March 25th",
      time: "1 day ago",
      unread: true,
    },
  ]);

  const [skills, setSkills] = useState([
    "React",
    "TypeScript",
    "Node.js",
    "Python",
  ]);

  useEffect(() => {
    const placementTrendsChart = echarts.init(document.getElementById('placementTrends'));
    const salaryTrendsChart = echarts.init(document.getElementById('salaryTrends'));

    const placementOption = {
      animation: false,
      title: {
        text: 'Placement Trends',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['2021', '2022', '2023', '2024', '2025']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [85, 89, 92, 94, 96],
        type: 'line',
        smooth: true
      }]
    };

    const salaryOption = {
      animation: false,
      title: {
        text: 'Company-wise Average Salary',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [150000, 140000, 135000, 145000, 160000],
        type: 'bar'
      }]
    };

    placementTrendsChart.setOption(placementOption);
    salaryTrendsChart.setOption(salaryOption);

    return () => {
      placementTrendsChart.dispose();
      salaryTrendsChart.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://public.readdy.ai/ai/img_res/9bccdf3474bb5c368e428466fab1aa55.jpg" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">James Sullivan</h3>
              <p className="text-sm text-gray-500">Computer Science</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative !rounded-button">
              <i className="fas fa-bell"></i>
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                2
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="!rounded-button whitespace-nowrap">
                  <i className="fas fa-cog mr-2"></i>
                  Settings
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Manage your personal details and resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue="James Sullivan" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue="james.sullivan@university.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                        <button
                          className="ml-2 text-gray-500 hover:text-gray-700"
                          onClick={() => setSkills(skills.filter(s => s !== skill))}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full !rounded-button whitespace-nowrap">
                  <i className="fas fa-save mr-2"></i>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications Card */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with latest opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {notifications.map((notification) => (
                  <Alert key={notification.id} className="mb-4">
                    <i className={`fas fa-info-circle mr-2 ${notification.unread ? 'text-blue-500' : ''}`}></i>
                    <AlertTitle>{notification.title}</AlertTitle>
                    <AlertDescription>
                      {notification.description}
                      <div className="text-sm text-gray-500 mt-1">{notification.time}</div>
                    </AlertDescription>
                  </Alert>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Placement Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Placement Trends</CardTitle>
              <CardDescription>Year-wise placement statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div id="placementTrends" style={{ height: '300px' }}></div>
            </CardContent>
          </Card>

          {/* Salary Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Salary Distribution</CardTitle>
              <CardDescription>Company-wise average packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div id="salaryTrends" style={{ height: '300px' }}></div>
            </CardContent>
          </Card>

          {/* Skill Recommendations */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Recommended Skills</CardTitle>
              <CardDescription>Based on current market demands</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: "Machine Learning", demand: 95 },
                  { name: "Cloud Computing", demand: 90 },
                  { name: "Data Analytics", demand: 88 },
                  { name: "Cybersecurity", demand: 85 },
                  { name: "DevOps", demand: 82 },
                  { name: "Blockchain", demand: 80 },
                ].map((skill) => (
                  <Card key={skill.name}>
                    <CardContent className="pt-6">
                      <h4 className="font-medium mb-2">{skill.name}</h4>
                      <Progress value={skill.demand} className="mb-2" />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>Demand</span>
                        <span>{skill.demand}%</span>
                      </div>
                      <Button className="w-full mt-4 !rounded-button whitespace-nowrap" variant="outline">
                        <i className="fas fa-plus mr-2"></i>
                        Add to Skills
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default App;

