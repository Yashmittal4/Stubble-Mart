import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { ShoppingCart, Tractor, Truck, Store, Users } from "lucide-react"

function Card({ children, className, ...props }) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow ${className}`} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }) {
  return <div className={`flex flex-row items-center justify-between space-y-0 pb-2 ${className}`} {...props} />
}

function CardTitle({ className, ...props }) {
  return <h3 className={`text-sm font-medium ${className}`} {...props} />
}

function CardContent({ className, ...props }) {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

function Dashboard() {
  const [collaboratorTypes, setCollaboratorTypes] = useState([
    { name: "Stubble purchasing company", count: 0, icon: ShoppingCart, type: "STUBBLE_PURCHASING_COMPANY" },
    { name: "Machine rental", count: 0, icon: Tractor, type: "MACHINE_RENTAL" },
    { name: "Transportation company", count: 0, icon: Truck, type: "TRANSPORTATION_COMPANY" },
    { name: "Agriculture shops", count: 0, icon: Store, type: "AGRICULTURE_SHOPS" },
  ])

  const [farmerCount, setFarmerCount] = useState(0)

  useEffect(() => {
    // Simulating API calls
    const fetchData = async () => {
      // This would be replaced with actual API calls
      setCollaboratorTypes((prevTypes) =>
        prevTypes.map((type) => ({ ...type, count: Math.floor(Math.random() * 100) })),
      )
      setFarmerCount(Math.floor(Math.random() * 1000))
    }

    fetchData()
  }, [])

  return (
    <div className="flex h-screen bg-gray-100">
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collaboratorTypes.map((collab, index) => (
            <Link to={`/admin/collaborator/${collab.type.toLowerCase()}`} key={index}>
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{collab.name}</CardTitle>
                  <collab.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{collab.count}</div>
                  <p className="text-xs text-muted-foreground">Registered collaborators</p>
                </CardContent>
              </Card>
            </Link>
          ))}
          <Link to="/admin/farmers">
            <Card className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>Registered Farmers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{farmerCount}</div>
                <p className="text-xs text-muted-foreground">Farmers who have ordered with us</p>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Collaborator Distribution (Pie Chart)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={collaboratorTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {collaboratorTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Collaborator Distribution (Bar Chart)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={collaboratorTypes}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8">
                    {collaboratorTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

