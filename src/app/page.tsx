// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client";
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';
// import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const App: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  
  useEffect(() => {
    // Progress Chart
    const progressChart = echarts.init(document.getElementById('progressChart'));
    const progressOption = {
      animation: false,
      series: [{
        type: 'pie',
        radius: ['75%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
        },
        data: [
          { value: 75, name: 'Placed', itemStyle: { color: '#22c55e' } },
          { value: 25, name: 'Unplaced', itemStyle: { color: '#e5e7eb' } }
        ]
      }]
    };
    progressChart.setOption(progressOption);

    // Salary Trends Chart
    const salaryChart = echarts.init(document.getElementById('salaryChart'));
    const salaryOption = {
      animation: false,
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['Technology', 'Finance', 'Marketing']
      },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
      },
      yAxis: {
        type: 'value',

        name: 'Salary (USD)',
      },
      series: [
        {
          name: 'Technology',
          type: 'line',
          data: [85000, 88000, 90000, 92000, 95000, 98000],
          smooth: true
        },
        {
          name: 'Finance',
          type: 'line',
          data: [80000, 82000, 85000, 88000, 90000, 92000],
          smooth: true
        },
        {
          name: 'Marketing',
          type: 'line',
          data: [70000, 72000, 75000, 77000, 80000, 82000],
          smooth: true
        }
      ]
    };
    salaryChart.setOption(salaryOption);

    // Company Participation Chart
    const companyChart = echarts.init(document.getElementById('companyChart'));
    const companyOption = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['Microsoft', 'Google', 'Amazon', 'Meta', 'Apple']
      },
      series: [
        {
          type: 'bar',
          data: [45, 42, 38, 35, 32],
          itemStyle: {
            color: '#3b82f6'
          }
        }
      ]
    };
    companyChart.setOption(companyOption);

    return () => {
      progressChart.dispose();
      salaryChart.dispose();
      companyChart.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="https://public.readdy.ai/ai/img_res/c02a063eeeaeb84ac746ab840b3b6166.jpg" 
                 alt="Logo" 
                 className="h-8" />
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="relative">
              <i className="fas fa-bell text-gray-600 text-xl cursor-pointer"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
            <Avatar className="cursor-pointer">
              <img src="https://public.readdy.ai/ai/img_res/82ee6ae2d7a36eaf5454915c1a41e3a5.jpg" 
                   alt="User" />
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Time Filter */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Placement Analytics Dashboard</h1>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold mt-1">1,245</h3>
              </div>
              <Badge className="bg-green-100 text-green-800">+12.5%</Badge>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Placed Students</p>
                <h3 className="text-2xl font-bold mt-1">934</h3>
              </div>
              <Badge className="bg-green-100 text-green-800">75%</Badge>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Unplaced Students</p>
                <h3 className="text-2xl font-bold mt-1">311</h3>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">25%</Badge>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Average Salary</p>
                <h3 className="text-2xl font-bold mt-1">$85,000</h3>
              </div>
              <Badge className="bg-green-100 text-green-800">+8.3%</Badge>
            </div>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Progress Chart */}
          <Card className="col-span-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Placement Progress</h3>
            <div className="relative">
              <div id="progressChart" style={{ height: '300px' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-gray-900">75%</div>
                <div className="text-sm text-gray-500">Placement Rate</div>
              </div>
            </div>
          </Card>

          {/* Salary Trends */}
          <Card className="col-span-8 p-6">
            <h3 className="text-lg font-semibold mb-4">Salary Trends</h3>
            <div id="salaryChart" style={{ height: '300px' }}></div>
          </Card>

          {/* Company Participation */}
          <Card className="col-span-8 p-6">
            <h3 className="text-lg font-semibold mb-4">Top Recruiting Companies</h3>
            <div id="companyChart" style={{ height: '300px' }}></div>
          </Card>

          {/* Quick Insights */}
          <Card className="col-span-4 p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Week over Week</h4>
                <p className="text-green-600 font-medium mt-1">+15% placement rate</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Top Sectors</h4>
                <div className="mt-1 space-y-1">
                  <div className="flex justify-between">
                    <span>Technology</span>
                    <span className="text-green-600">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Finance</span>
                    <span className="text-green-600">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing</span>
                    <span className="text-green-600">25%</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Upcoming Drives</h4>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Microsoft</span>
                    <Badge>Mar 20</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Amazon</span>
                    <Badge>Mar 22</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Google</span>
                    <Badge>Mar 25</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default App;

