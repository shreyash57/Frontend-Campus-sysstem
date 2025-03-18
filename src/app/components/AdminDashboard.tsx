// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faUsers, faCheckCircle, faDollarSign, faBuilding, faChartLine, faUserGraduate, faChartPie, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as echarts from 'echarts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const App: React.FC = () => {
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
// Initialize charts after component mounts
React.useEffect(() => {
// Student Status chart
const branchChart = echarts.init(document.getElementById('branchChart'));
const branchOption = {
animation: false,
title: { text: 'Student Placement Status', left: 'center' },
tooltip: { trigger: 'item' },
legend: {
orient: 'vertical',
left: 'left',
},
series: [{
name: 'Placement Status',
type: 'pie',
radius: '70%',
data: [
{ value: 892, name: 'Placed Students', itemStyle: { color: '#4F46E5' } },
{ value: 356, name: 'Unplaced Students', itemStyle: { color: '#94A3B8' } }
],
emphasis: {
itemStyle: {
shadowBlur: 10,
shadowOffsetX: 0,
shadowColor: 'rgba(0, 0, 0, 0.5)'
}
}
}]
};
branchChart.setOption(branchOption);
// Salary trends chart
const salaryChart = echarts.init(document.getElementById('salaryChart'));
const salaryOption = {
animation: false,
title: { text: 'Salary Trends (LPA)', left: 'center' },
tooltip: { trigger: 'axis' },
xAxis: {
type: 'category',
data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
},
yAxis: { type: 'value' },
series: [{
data: [12, 14, 15, 16, 18, 20],
type: 'line',
smooth: true,
itemStyle: { color: '#64748B' }
}]
};
salaryChart.setOption(salaryOption);
// Company participation chart
const companyChart = echarts.init(document.getElementById('companyChart'));
const companyOption = {
animation: false,
title: { text: 'Company Distribution', left: 'center' },
tooltip: { trigger: 'item' },
series: [{
type: 'pie',
radius: ['40%', '70%'],
data: [
{ value: 35, name: 'Tech', itemStyle: { color: '#475569' } },
{ value: 25, name: 'Finance', itemStyle: { color: '#64748B' } },
{ value: 20, name: 'Consulting', itemStyle: { color: '#94A3B8' } },
{ value: 20, name: 'Others', itemStyle: { color: '#CBD5E1' } }
]
}]
};
companyChart.setOption(companyOption);
}, []);
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="h-16 bg-white shadow-sm fixed w-full z-50 flex items-center justify-between px-6">
<div></div>
<div className="flex items-center gap-6">
<button className="relative cursor-pointer">
<i className="fas fa-bell text-gray-600"></i>
<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
</button>
<div className="flex items-center gap-3 cursor-pointer">
<div className="bg-gray-100 px-4 py-2 rounded-lg">
<span className="font-medium text-gray-700">Admin</span>
</div>
</div>
</div>
</header>
{/* Sidebar */}
<aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-sm transition-all overflow-hidden ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
<ScrollArea className="h-full">
<nav className="p-4">
<Button
variant="ghost"
className="w-full justify-start mb-2 gap-3 text-gray-700 hover:text-black hover:bg-gray-100"
onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
>
<i className="fas fa-bars"></i>
{!sidebarCollapsed && <span>Toggle Menu</span>}
</Button>
{['Dashboard', 'Students', 'Recruiters', 'Analytics', 'Reports'].map((item) => (
<Button
key={item}
variant="ghost"
className="w-full justify-start mb-2 gap-3 text-gray-700 hover:text-black hover:bg-gray-100"
>
<i className={`fas fa-${item.toLowerCase() === 'dashboard' ? 'chart-line' :
item.toLowerCase() === 'students' ? 'user-graduate' :
item.toLowerCase() === 'recruiters' ? 'building' :
item.toLowerCase() === 'analytics' ? 'chart-pie' :
item.toLowerCase() === 'reports' ? 'file-alt' : ''}`}>
</i>
{!sidebarCollapsed && <span>{item}</span>}
</Button>
))}
</nav>
</ScrollArea>
</aside>
{/* Main Content */}
<main className={`pt-20 transition-all ${sidebarCollapsed ? 'ml-20' : 'ml-64'} px-6`}>
<div className="max-w-[1440px] mx-auto">
{/* Stats Cards */}
<div className="grid grid-cols-4 gap-6 mb-8">
{[
{ title: 'Total Students', value: '1,248', icon: 'users', color: 'bg-gray-600' },
{ title: 'Placed Students', value: '892', icon: 'check-circle', color: 'bg-gray-700' },
{ title: 'Average Package', value: '₹14.2 LPA', icon: 'dollar-sign', color: 'bg-gray-800' },
{ title: 'Company Visits', value: '42', icon: 'building', color: 'bg-gray-900' }
].map((stat) => (
<Card key={stat.title} className="p-6">
<div className="flex items-center justify-between">
<div>
<p className="text-sm text-gray-500">{stat.title}</p>
<h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
</div>
<div className={`${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}>
<i className={`fas fa-${stat.icon} text-white text-xl`}></i>
</div>
</div>
</Card>
))}
</div>
{/* Charts Grid */}
<div className="grid grid-cols-2 gap-6 mb-8">
<Card className="p-6">
<div id="branchChart" style={{ height: '400px' }}></div>
</Card>
<Card className="p-6">
<div id="salaryChart" style={{ height: '400px' }}></div>
</Card>
</div>
{/* Bottom Section */}
<div className="grid grid-cols-3 gap-6">
<Card className="col-span-2 p-6">
<Tabs defaultValue="upcoming">
<TabsList className="mb-4">
<TabsTrigger value="upcoming">Upcoming Drives</TabsTrigger>
<TabsTrigger value="recent">Recent Placements</TabsTrigger>
</TabsList>
<TabsContent value="upcoming">
<div className="space-y-4">
{[
{ company: 'Microsoft', role: 'Software Engineer', date: '2025-03-25', package: '45 LPA' },
{ company: 'Goldman Sachs', role: 'Technology Analyst', date: '2025-03-28', package: '32 LPA' },
{ company: 'Google', role: 'Product Manager', date: '2025-04-02', package: '48 LPA' }
].map((drive) => (
<div key={drive.company} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
<i className="fas fa-building text-gray-600 text-xl"></i>
</div>
<div>
<h4 className="font-semibold">{drive.company}</h4>
<p className="text-sm text-gray-500">{drive.role}</p>
</div>
</div>
<div className="text-right">
<p className="font-medium">{drive.package}</p>
<p className="text-sm text-gray-500">{drive.date}</p>
</div>
</div>
))}
</div>
</TabsContent>
<TabsContent value="recent">
<div className="space-y-4">
{[
{ student: 'Emily Parker', company: 'Amazon', role: 'SDE', package: '42 LPA' },
{ student: 'Michael Chen', company: 'Meta', role: 'Product Designer', package: '38 LPA' },
{ student: 'Sarah Johnson', company: 'Apple', role: 'iOS Developer', package: '40 LPA' }
].map((placement) => (
<div key={placement.student} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
<div className="flex items-center gap-4">
<Avatar className="h-12 w-12">
<img src={`https://readdy.ai/api/search-image?query=professional headshot portrait of a young graduate student in formal attire, neutral background, studio lighting&width=100&height=100&flag=6348919efde02e73c8fcfad7c3f61bf3&seq=${placement.student}&orientation=squarish`} alt={placement.student} />
</Avatar>
<div>
<h4 className="font-semibold">{placement.student}</h4>
<p className="text-sm text-gray-500">{placement.company} - {placement.role}</p>
</div>
</div>
<div className="text-right">
<p className="font-medium">{placement.package}</p>
<p className="text-sm text-green-500">Placed</p>
</div>
</div>
))}
</div>
</TabsContent>
</Tabs>
</Card>
<Card className="p-6">
<div id="companyChart" style={{ height: '300px' }}></div>
</Card>
</div>
</div>
</main>
</div>
);
}
export default App
