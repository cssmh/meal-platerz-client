import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { getUserData } from "../api/users";
import useAuth from "../hooks/useAuth";
import SmallLoader from "../Component/SmallLoader";

const COLORS = ["#f01543", "#00C49F", "#FFBB28"];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontSize: "13px", fontWeight: "normal" }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const UserAnalytics = () => {
  const { loading, user } = useAuth();
  const { data = [], isLoading } = useQuery({
    queryKey: ["userData", user?.email],
    queryFn: async () => {
      return await getUserData(user?.email);
    },
    enabled: !loading && !!user,
  });

  if (isLoading) return <SmallLoader />;

  const { foodCount, requestCount, reviewCount, user: userData } = data;

  const pieData = [
    { name: "Foods Added", value: foodCount },
    { name: "Requests Made", value: requestCount },
    { name: "Reviews Written", value: reviewCount },
  ];

  const barData = [
    { name: "Food Count", value: foodCount },
    { name: "Request Count", value: requestCount },
    { name: "Review Count", value: reviewCount },
  ];

  const lineData = [
    { name: "Month 1", foodCount: 2, requestCount: 3, reviewCount: 1 },
    { name: "Month 2", foodCount: 5, requestCount: 3, reviewCount: 2 },
    { name: "Month 3", foodCount: 8, requestCount: 5, reviewCount: 3 },
  ];

  const pieLabels = pieData
    .map(
      (entry) =>
        `${entry.name}: ${(
          (entry.value / (foodCount + requestCount + reviewCount)) *
          100
        ).toFixed(0)}%`
    )
    .join("  ");

  return (
    <div className="p-3 md:p-7 bg-gray-100 min-h-screen">
      <div className="text-center mb-5 md:mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          Welcome, {userData?.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 shadow-lg rounded-lg border-t-4 border-red-300">
          <h3 className="text-xl font-semibold text-center md:mb-4 text-gray-600">
            Activity Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#FF6B6B"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center text-black">{pieLabels}</div>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg border-t-4 border-red-300">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-600">
            User Activity Counts
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 shadow-lg rounded-lg border-t-4 border-red-300">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-600">
            Activity Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="foodCount" stroke="#FF6B6B" />
              <Line type="monotone" dataKey="requestCount" stroke="#FF9A9A" />
              <Line type="monotone" dataKey="reviewCount" stroke="#FFBABA" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserAnalytics;
