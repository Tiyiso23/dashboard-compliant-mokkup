import React, { useState } from 'react';
import {
  Users,
  Shield,
  UserPlus,
  Mail,
  CheckCircle2,
  Lock,
  Search,
} from 'lucide-react';
import { UserAccount } from '../types';
import { MOCK_USERS } from '../data/mockComplianceData';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserAccount[]>(MOCK_USERS);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserAccount['role']>('SARS Liaison Officer');
  const [inviteDept, setInviteDept] = useState<UserAccount['department']>('Tax & Regulatory');

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      department: inviteDept,
      lastActive: 'Just invited',
      status: 'Invited',
      permissions: ['VIEW_DOCUMENTS', 'RUN_OCR'],
    };

    setUsers([...users, newUser]);
    setShowInviteModal(false);
    setInviteName('');
    setInviteEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold tracking-tight text-white">
              User & Access Governance
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              Role-Based Access Control (RBAC)
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Manage compliance officers, SARS liaisons, academic administrators, RPA operators, and external audit credentials.
          </p>
        </div>

        <div>
          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Compliance Officer</span>
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-900/60">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
            <tr>
              <th className="py-2.5 px-3">Name & Email</th>
              <th className="py-2.5 px-3">Compliance Role</th>
              <th className="py-2.5 px-3">Department</th>
              <th className="py-2.5 px-3">Last Active</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Access Level</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-medium text-slate-200">
                  <div className="font-semibold text-slate-100">{user.name}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">{user.email}</div>
                </td>
                <td className="py-2.5 px-3">
                  <span className="text-cyan-300 font-medium">{user.role}</span>
                </td>
                <td className="py-2.5 px-3 text-slate-400">
                  {user.department}
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-400 tabular-nums">
                  {user.lastActive}
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={`text-[11px] font-mono flex items-center gap-1 ${
                      user.status === 'Active'
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {user.status}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono text-[11px] text-slate-400">
                  {user.permissions.length} Permissions
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-100">Invite Compliance Team Member</h3>
                <div className="text-xs text-slate-400">Assign role and security permissions</div>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-slate-500 hover:text-slate-300 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Lerato Khumalo"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Email Address (@mindworx.co.za)</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="e.g. lerato.k@mindworx.co.za"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-400"
                >
                  <option value="Managing Director">Managing Director</option>
                  <option value="Compliance Director">Compliance Director</option>
                  <option value="SARS Liaison Officer">SARS Liaison Officer</option>
                  <option value="Academic Registrar">Academic Registrar</option>
                  <option value="RPA Operator">RPA Operator</option>
                  <option value="Lead Auditor">Lead Auditor</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold rounded"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
