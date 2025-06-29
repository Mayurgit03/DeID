import React from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { getCredentialTypeIcon, getStatusColor, formatDate } from '../utils/helpers'
import Card from '../components/ui/Card'

const Dashboard: React.FC = () => {
  const { userDID, credentials } = useStore()

  const stats = [
    {
      name: 'DID Status',
      value: userDID ? 'Active' : 'Not Created',
      icon: '🆔',
      color: userDID ? 'text-green-600' : 'text-red-600',
      bgColor: userDID ? 'bg-green-100' : 'bg-red-100'
    },
    {
      name: 'Credentials',
      value: credentials.length.toString(),
      icon: '📜',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'NFT Identity',
      value: userDID ? 'Minted' : 'Not Minted',
      icon: '🎨',
      color: userDID ? 'text-purple-600' : 'text-gray-600',
      bgColor: userDID ? 'bg-purple-100' : 'bg-gray-100'
    },
    {
      name: 'Active Credentials',
      value: credentials.filter(c => !c.isRevoked).length.toString(),
      icon: '✅',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  const quickActions = [
    {
      name: 'Create DID',
      description: 'Generate your decentralized identifier',
      href: '/create-did',
      icon: '🆔',
      color: 'bg-blue-600',
      disabled: !!userDID
    },
    {
      name: 'View Profile',
      description: 'Manage your identity information',
      href: '/profile',
      icon: '👤',
      color: 'bg-green-600',
      disabled: false
    },
    {
      name: 'Scan QR',
      description: 'Verify credentials or identity',
      href: '/verifier',
      icon: '📱',
      color: 'bg-purple-600',
      disabled: false
    },
    {
      name: 'View NFT',
      description: 'See your identity NFT card',
      href: '/nft-identity',
      icon: '🎨',
      color: 'bg-indigo-600',
      disabled: !userDID
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to DeID
            </h1>
            <p className="text-gray-600">
              Your decentralized identity dashboard. Manage your DID, credentials, and verifications.
            </p>
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Frontend Demo Mode
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl">🔐</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor} mr-4`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className={`block p-6 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 transform hover:scale-105 ${
                action.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
              onClick={(e) => action.disabled && e.preventDefault()}
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-white text-xl">{action.icon}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.name}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </Link>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        {credentials.length > 0 ? (
          <div className="space-y-4">
            {credentials.slice(0, 3).map((credential, index) => {
              const statusColors = getStatusColor(credential.isRevoked ? 'revoked' : 'active')
              return (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600">
                      {getCredentialTypeIcon(credential.credentialType)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      New credential: {credential.credentialType}
                    </p>
                    <p className="text-sm text-gray-600">
                      Issued {formatDate(credential.issuedAt)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${statusColors.bg} ${statusColors.text}`}>
                    {credential.isRevoked ? 'Revoked' : 'Active'}
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-gray-600">No recent activity</p>
            <p className="text-sm text-gray-500 mt-1">
              {!userDID ? 'Create your DID to get started' : 'Request credentials from trusted issuers'}
            </p>
          </div>
        )}
      </Card>
    </div>
  )
}

export default Dashboard