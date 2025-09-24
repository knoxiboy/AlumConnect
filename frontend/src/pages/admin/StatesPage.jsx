import { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  placementStatsData,
  enrollmentData,
  placementPercentageData,
  companyIntakeData,
} from "../../data/adminStatsMockData";

const brand = {
  indigo: '153 102 204',   // #9966CC
  lilac:  '196 160 255',  // #C4A0FF
  coral:  '255 145 120',  // #FF9178
};

const COLORS = ['#9966CC', '#C4A0FF', '#FF9178', '#66B2FF', '#FFCC66', '#99FF99', '#FF99CC', '#99CCFF'];

export default function StatesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            State Statistics Dashboard
          </h1>
          <p className="text-slate-600 mt-2">
            Comprehensive analytics and statistics for alumni engagement and placement metrics
          </p>
        </div>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid gap-4 sm:gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Alumni" 
          value="12,847" 
          delta="+8.2%" 
          color={brand.indigo}
          subtitle="Registered alumni"
        />
        <StatCard 
          title="Placement Rate" 
          value="87.4%" 
          delta="+2.1%" 
          color={brand.coral}
          subtitle="Current year average"
        />
        <StatCard 
          title="Avg Package" 
          value="₹24.5L" 
          delta="+12.3%" 
          color={brand.lilac}
          subtitle="Annual average"
        />
        <StatCard 
          title="Top Companies" 
          value="245" 
          delta="+15" 
          color={brand.indigo}
          subtitle="Partner companies"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-8">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'overview'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'placements'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('placements')}
        >
          Placement Stats
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'enrollment'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('enrollment')}
        >
          Enrollment
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'placements-percentage'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('placements-percentage')}
        >
          Placement %
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'companies'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('companies')}
        >
          Company Intake
        </button>
      </div>

      {/* Charts */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Highest Package Line Chart */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Highest Package (₹ LPA)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={placementStatsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="year" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #cbd5e1', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="highestPackage" 
                    stroke={`rgb(${brand.indigo})`} 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                    name="Highest Package (LPA)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enrollment Bar Chart */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Batch-wise Student Enrollment</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="batch" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #cbd5e1', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="students" 
                    fill={`rgb(${brand.coral})`} 
                    name="Number of Students"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Placement Percentage Column Chart */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Placement Percentage by Batch</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={placementPercentageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="batch" stroke="#64748b" />
                  <YAxis stroke="#64748b" unit="%" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #cbd5e1', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                  <Bar 
                    dataKey="percentage" 
                    fill={`rgb(${brand.lilac})`} 
                    name="Placement Percentage"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Company Intake Pie Chart */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Company Intake Distribution (2021-2025)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={companyIntakeData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="students"
                    nameKey="company"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {companyIntakeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #cbd5e1', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'placements' && (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Placement Statistics Over Years (₹ LPA)</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placementStatsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="highestPackage" 
                  stroke={`rgb(${brand.indigo})`} 
                  strokeWidth={2}
                  activeDot={{ r: 8 }} 
                  name="Highest Package"
                />
                <Line 
                  type="monotone" 
                  dataKey="medianPackage" 
                  stroke={`rgb(${brand.lilac})`} 
                  strokeWidth={2}
                  name="Median Package"
                />
                <Line 
                  type="monotone" 
                  dataKey="avgPackage" 
                  stroke={`rgb(${brand.coral})`} 
                  strokeWidth={2}
                  name="Average Package"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'enrollment' && (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Batch-wise Student Enrollment</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="batch" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey="students" 
                  fill={`rgb(${brand.coral})`} 
                  name="Number of Students"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'placements-percentage' && (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Placement Percentage by Batch</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={placementPercentageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="batch" stroke="#64748b" />
                <YAxis stroke="#64748b" unit="%" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Bar 
                  dataKey="percentage" 
                  fill={`rgb(${brand.lilac})`} 
                  name="Placement Percentage"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'companies' && (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Company Intake Distribution (2021-2025)</h3>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={companyIntakeData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="students"
                  nameKey="company"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {companyIntakeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #cbd5e1', 
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, delta, color, subtitle }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all">
      <div className="min-w-0 flex-1">
        <p className="text-xs sm:text-sm font-medium text-slate-600 line-clamp-1">{title}</p>
        <p className="text-lg sm:text-2xl font-bold text-slate-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-slate-500 line-clamp-1">{subtitle}</p>
        )}
        {delta && (
          <p className="text-xs sm:text-sm text-green-600 mt-1">
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}