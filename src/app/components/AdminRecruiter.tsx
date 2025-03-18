// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
"use client"
import React, { useState } from 'react';
import * as echarts from 'echarts';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const App: React.FC = () => {
const [activeTab, setActiveTab] = useState('overview');
const [lastRefresh, setLastRefresh] = useState<string>(new Date().toLocaleTimeString());
const [showAddRecruiterModal, setShowAddRecruiterModal] = useState(false);
const [recruiters, setRecruiters] = useState([
{
id: 1,
name: "Emily Richardson",
email: "emily.r@techrecruit.com",
company: "TechRecruit Solutions",
role: "Senior Recruiter",
status: "Active",
hires: 45,
avatar: "https://public.readdy.ai/ai/img_res/c6a7594aac9ad8768826e67a0cede581.jpg"
},
{
id: 2,
name: "Michael Chen",
email: "m.chen@globaltalent.com",
company: "Global Talent Partners",
role: "Technical Recruiter",
status: "Active",
hires: 32,
avatar: "https://public.readdy.ai/ai/img_res/ae3ffd4da8ee4cd8798c7dbff67ee480.jpg"
},
{
id: 3,
name: "Sarah Martinez",
email: "sarah.m@nexthire.co",
company: "NextHire",
role: "Campus Recruiter",
status: "Active",
hires: 28,
avatar: "https://public.readdy.ai/ai/img_res/d98dc65e5128d29e57466a0477574d3f.jpg"
}
]);
const [selectedRecruiter, setSelectedRecruiter] = useState(null);
const [editMode, setEditMode] = useState(false);
useEffect(() => {
// Branch-wise chart
const branchChart = echarts.init(document.getElementById('branch-chart'));
const branchOption = {
animation: false,
tooltip: {
trigger: 'axis'
},
legend: {
data: ['Interviewed', 'Selected'],
top: 10
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
data: ['Software', 'Data Science', 'Product', 'DevOps', 'Design']
},
yAxis: {
type: 'value'
},
series: [
{
name: 'Interviewed',
type: 'bar',
data: [120, 98, 85, 70, 65],
itemStyle: {
color: '#60A5FA'
}
},
{
name: 'Selected',
type: 'bar',
data: [95, 75, 60, 45, 40],
itemStyle: {
color: '#34D399'
}
}
]
};
branchChart.setOption(branchOption);
// Hiring trend chart
const trendChart = echarts.init(document.getElementById('trend-chart'));
const trendOption = {
animation: false,
tooltip: {
trigger: 'axis'
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
},
yAxis: {
type: 'value',
name: 'Hiring Count'
},
series: [
{
data: [25, 35, 45, 42, 48, 52],
type: 'line',
smooth: true,
itemStyle: {
color: '#8B5CF6'
}
}
]
};
trendChart.setOption(trendOption);
return () => {
branchChart.dispose();
trendChart.dispose();
};
}, []);
const companyData = [
{
name: 'Microsoft Corporation',
logo: 'https://public.readdy.ai/ai/img_res/65befef3966527530d414cda529abb19.jpg',
status: 'Active',
positions: 12,
hired: 28,
location: 'Seattle, USA'
},
{
name: 'Amazon Web Services',
logo: 'https://public.readdy.ai/ai/img_res/b843d9bc6ffd6ebe2bc5eb1a0a7f8040.jpg',
status: 'Active',
positions: 8,
hired: 15,
location: 'New York, USA'
},
{
name: 'Google Cloud',
logo: 'https://public.readdy.ai/ai/img_res/6e3c1865ed957bad8280900be6ec32bc.jpg',
status: 'Active',
positions: 6,
hired: 12,
location: 'Mountain View, USA'
}
];
return (
<div className="min-h-screen bg-gray-50">
{/* Top Navigation */}
<header className="bg-white border-b">
<div className="flex items-center justify-between px-6 h-16">
<div className="flex items-center gap-4">
<div className="text-blue-600 text-2xl">
<i className="fas fa-cube"></i>
</div>
<h1 className="text-xl font-semibold text-gray-900">Recruiter Dashboard</h1>
</div>
<div className="flex items-center gap-4">
<button className="relative">
<i className="fas fa-bell text-gray-600"></i>
<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
</button>
<div className="flex items-center gap-2">
<i className="fas fa-user-shield text-gray-600"></i>
<span className="text-gray-700">Admin</span>
</div>
</div>
</div>
</header>
<div className="flex">
{/* Sidebar */}
<aside className="w-64 bg-[#070926] h-[calc(100vh-64px)] p-4">
<nav className="space-y-2">
<Button
variant="ghost"
className="w-full justify-start gap-3 text-white hover:bg-gray-800 relative"
onClick={() => {
const button = document.querySelector('.dashboard-btn');
if (button) {
button.classList.add('animate-pulse');
}
// Reset state and refresh data
setActiveTab('overview');
// Simulate data refresh
setTimeout(() => {
if (button) {
button.classList.remove('animate-pulse');
}
// Update last refresh timestamp
setLastRefresh(new Date().toLocaleTimeString());
}, 1000);
}}
>
<i className="fas fa-chart-line"></i>
<span>Dashboard</span>
<span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
{lastRefresh && `Last updated: ${lastRefresh}`}
</span>
</Button>
<Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black bg-white text-black">
<i className="fas fa-building"></i>
Recruiters
</Button>
<Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black">
<i className="fas fa-user-graduate"></i>
Students
</Button>
<a href="https://readdy.ai/home/249b93cc-ef5d-4112-b9c9-5f3497f31377/4215ee17-9d2e-49cd-8f6f-2736cfa2389c" data-readdy="true">
<Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black">
<i className="fas fa-chart-bar"></i>
Analytics
</Button>
</a>
<Button variant="ghost" className="w-full justify-start gap-3 text-white hover:bg-white hover:text-black">
<i className="fas fa-briefcase"></i>
Job Requests
</Button>
</nav>
</aside>
{/* Main Content */}
<main className="flex-1 p-6">
{/* Stats Cards */}
<div className="grid grid-cols-4 gap-6 mb-6">
<Card className="p-6">
<div className="flex items-center justify-between">
<div>
<p className="text-sm text-gray-500">Total Students</p>
<h3 className="text-2xl font-bold mt-1">545</h3>
</div>
<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
<i className="fas fa-users text-blue-600 text-xl"></i>
</div>
</div>
</Card>
<Card className="p-6">
<div className="flex items-center justify-between">
<div>
<p className="text-sm text-gray-500">Placed Students</p>
<h3 className="text-2xl font-bold mt-1">438</h3>
</div>
<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
<i className="fas fa-check text-green-600 text-xl"></i>
</div>
</div>
</Card>
<Card className="p-6">
<div className="flex items-center justify-between">
<div>
<p className="text-sm text-gray-500">Active Recruiters</p>
<h3 className="text-2xl font-bold mt-1">72</h3>
</div>
<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
<i className="fas fa-building text-purple-600 text-xl"></i>
</div>
</div>
</Card>
<Card className="p-6">
<div className="flex items-center justify-between">
<div>
<p className="text-sm text-gray-500">Pending Requests</p>
<h3 className="text-2xl font-bold mt-1">15</h3>
</div>
<div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
<i className="fas fa-clock text-orange-600 text-xl"></i>
</div>
</div>
</Card>
</div>
<div className="grid grid-cols-12 gap-6">
{/* Charts */}
<Card className="col-span-8 p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-lg font-semibold">Recruitment Statistics</h2>
<div className="flex gap-2">
<Button variant="outline" size="sm">
<i className="fas fa-download mr-2"></i>
Export
</Button>
<Button variant="outline" size="sm">
<i className="fas fa-filter mr-2"></i>
Filter
</Button>
</div>
</div>
<div id="branch-chart" style={{ height: '400px' }}></div>
</Card>
<Card className="col-span-4 p-6">
<h2 className="text-lg font-semibold mb-6">Hiring Trends</h2>
<div id="trend-chart" style={{ height: '400px' }}></div>
</Card>
{/* Company List */}
{/* Recruiters Management Section */}
<Card className="col-span-12 p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-lg font-semibold">Recruiters Management</h2>
<Button onClick={() => {
setEditMode(false);
setSelectedRecruiter(null);
setShowAddRecruiterModal(true);
}} className="!rounded-button">
<i className="fas fa-plus mr-2"></i>
Add Recruiter
</Button>
</div>
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="border-b border-gray-200">
<th className="text-left py-4 px-4 font-medium text-gray-500">Recruiter</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Company</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Role</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Status</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Total Hires</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Actions</th>
</tr>
</thead>
<tbody>
{recruiters.map((recruiter) => (
<tr key={recruiter.id} className="border-b border-gray-100">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<Avatar>
<AvatarImage src={recruiter.avatar} />
<AvatarFallback>{recruiter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
</Avatar>
<div>
<div className="font-medium">{recruiter.name}</div>
<div className="text-sm text-gray-500">{recruiter.email}</div>
</div>
</div>
</td>
<td className="py-4 px-4">{recruiter.company}</td>
<td className="py-4 px-4">{recruiter.role}</td>
<td className="py-4 px-4">
<Badge variant="success" className="bg-green-100 text-green-800">
{recruiter.status}
</Badge>
</td>
<td className="py-4 px-4">{recruiter.hires}</td>
<td className="py-4 px-4">
<div className="flex gap-2">
<Button
variant="ghost"
size="sm"
onClick={() => {
setSelectedRecruiter(recruiter);
setEditMode(true);
setShowAddRecruiterModal(true);
}}
>
<i className="fas fa-edit"></i>
</Button>
<Button
variant="ghost"
size="sm"
onClick={() => {
if (confirm('Are you sure you want to remove this recruiter?')) {
setRecruiters(recruiters.filter(r => r.id !== recruiter.id));
}
}}
>
<i className="fas fa-trash text-red-500"></i>
</Button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</Card>
{/* Add/Edit Recruiter Modal */}
{showAddRecruiterModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<Card className="w-[500px] p-6">
<h2 className="text-xl font-semibold mb-4">
{editMode ? 'Edit Recruiter' : 'Add New Recruiter'}
</h2>
<form onSubmit={(e) => {
e.preventDefault();
const formData = new FormData(e.target as HTMLFormElement);
const newRecruiter = {
id: editMode ? selectedRecruiter.id : Date.now(),
name: formData.get('name') as string,
email: formData.get('email') as string,
company: formData.get('company') as string,
role: formData.get('role') as string,
status: "Active",
hires: editMode ? selectedRecruiter.hires : 0,
avatar: "https://public.readdy.ai/ai/img_res/9bd272c986fe7de54918ffcb0281ce23.jpg"
};
if (editMode) {
setRecruiters(recruiters.map(r => r.id === selectedRecruiter.id ? newRecruiter : r));
} else {
setRecruiters([...recruiters, newRecruiter]);
}
setShowAddRecruiterModal(false);
}}>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium mb-1">Name</label>
<Input
name="name"
defaultValue={editMode ? selectedRecruiter.name : ''}
required
className="w-full"
/>
</div>
<div>
<label className="block text-sm font-medium mb-1">Email</label>
<Input
name="email"
type="email"
defaultValue={editMode ? selectedRecruiter.email : ''}
required
className="w-full"
/>
</div>
<div>
<label className="block text-sm font-medium mb-1">Company</label>
<Input
name="company"
defaultValue={editMode ? selectedRecruiter.company : ''}
required
className="w-full"
/>
</div>
<div>
<label className="block text-sm font-medium mb-1">Role</label>
<Input
name="role"
defaultValue={editMode ? selectedRecruiter.role : ''}
required
className="w-full"
/>
</div>
</div>
<div className="flex justify-end gap-2 mt-6">
<Button
type="button"
variant="outline"
onClick={() => setShowAddRecruiterModal(false)}
>
Cancel
</Button>
<Button type="submit">
{editMode ? 'Update' : 'Add'} Recruiter
</Button>
</div>
</form>
</Card>
</div>
)}
<Card className="col-span-12 p-6">
<div className="flex items-center justify-between mb-6">
<h2 className="text-lg font-semibold">Active Companies</h2>
<Button className="!rounded-button">
<i className="fas fa-plus mr-2"></i>
Add Company
</Button>
</div>
<div className="overflow-x-auto">
<table className="w-full">
<thead>
<tr className="border-b border-gray-200">
<th className="text-left py-4 px-4 font-medium text-gray-500">Company</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Status</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Open Positions</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Total Hired</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Location</th>
<th className="text-left py-4 px-4 font-medium text-gray-500">Actions</th>
</tr>
</thead>
<tbody>
{companyData.map((company, index) => (
<tr key={index} className="border-b border-gray-100">
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<img src={company.logo} alt={company.name} className="w-10 h-10 rounded-full" />
<span className="font-medium">{company.name}</span>
</div>
</td>
<td className="py-4 px-4">
<Badge variant="success" className="bg-green-100 text-green-800">
{company.status}
</Badge>
</td>
<td className="py-4 px-4">{company.positions}</td>
<td className="py-4 px-4">{company.hired}</td>
<td className="py-4 px-4">{company.location}</td>
<td className="py-4 px-4">
<div className="flex gap-2">
<Button variant="ghost" size="sm">
<i className="fas fa-edit"></i>
</Button>
<Button variant="ghost" size="sm">
<i className="fas fa-trash"></i>
</Button>
</div>
</td>
</tr>
))}
</tbody>
</table>
</div>
</Card>
</div>
</main>
</div>
</div>
);
};
export default App