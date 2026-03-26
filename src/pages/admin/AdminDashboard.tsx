import useAuth from "@/auth/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type User from "@/models/User";
import {
  createUserByAdmin,
  deleteUserByAdmin,
  getAllUsersByAdmin,
} from "@/services/AuthService";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type NewUserForm = {
  name: string;
  email: string;
  password: string;
};

const initialForm: NewUserForm = {
  name: "",
  email: "",
  password: "",
};

function AdminDashboard() {
  const user = useAuth((state) => state.user);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<NewUserForm>(initialForm);

  const totalUsers = users.length;
  const enabledUsers = useMemo(
    () => users.filter((item) => item.enabled).length,
    [users]
  );
  const adminUsers = useMemo(
    () =>
      users.filter((item) =>
        (item.roles ?? []).some((role) => role.name === "ADMIN")
      ).length,
    [users]
  );

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsersByAdmin();
      setUsers(response);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateUser = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setCreating(true);
    try {
      await createUserByAdmin({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        enabled: true,
      });
      toast.success("User created");
      setForm(initialForm);
      await loadUsers();
    } catch (error) {
      toast.error("Could not create user");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteUser = async (targetUser: User) => {
    if (!targetUser.id) {
      return;
    }

    if (targetUser.email === user?.email) {
      toast.error("You cannot delete your own account here");
      return;
    }

    const confirmed = window.confirm(
      `Delete user ${targetUser.email}? This cannot be undone.`
    );
    if (!confirmed) {
      return;
    }

    try {
      await deleteUserByAdmin(targetUser.id);
      toast.success("User deleted");
      await loadUsers();
    } catch (error) {
      toast.error("Could not delete user");
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{totalUsers}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Enabled Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{enabledUsers}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Admin Users</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-semibold">{adminUsers}</CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="new-name">Name</Label>
              <Input
                id="new-name"
                value={form.name}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="User full name"
              />
            </div>
            <div>
              <Label htmlFor="new-email">Email</Label>
              <Input
                id="new-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, email: event.target.value }))
                }
                placeholder="user@example.com"
              />
            </div>
            <div>
              <Label htmlFor="new-password">Password</Label>
              <Input
                id="new-password"
                type="password"
                value={form.password}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, password: event.target.value }))
                }
                placeholder="Temporary password"
              />
            </div>
          </div>
          <Button
            className="mt-4"
            onClick={handleCreateUser}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create User"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3">Name</th>
                    <th className="py-3">Email</th>
                    <th className="py-3">Provider</th>
                    <th className="py-3">Roles</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="py-3">{item.name || "-"}</td>
                      <td className="py-3">{item.email}</td>
                      <td className="py-3">{item.provider || "-"}</td>
                      <td className="py-3">
                        {(item.roles ?? []).map((role) => role.name).join(", ") || "-"}
                      </td>
                      <td className="py-3">{item.enabled ? "Enabled" : "Disabled"}</td>
                      <td className="py-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteUser(item)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
