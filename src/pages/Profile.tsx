import React, { useState } from 'react'
import { useStore } from '../store/useStore'

const Profile: React.FC = () => {
  const { userDID, userAddress, guardians, addGuardian, removeGuardian } = useStore()
  const [newGuardian, setNewGuardian] = useState('')
  const [guardianName, setGuardianName] = useState('')

  const handleAddGuardian = () => {
    if (!newGuardian.trim()) return

    addGuardian({
      address: newGuardian.trim(),
      isActive: true,
      name: guardianName.trim() || undefined
    })
    
    setNewGuardian('')
    setGuardianName('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (!userDID) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🆔</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No DID Found</h2>
          <p className="text-gray-600 mb-6">
            You need to create a DID first to view your profile.
          </p>
          <a
            href="/create-did"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create DID
          </a>
        </div>
      </div>
    )
  }

  const profileData = userDID.profileData

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            {profileData?.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-white text-3xl">👤</span>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {profileData?.name || 'Anonymous User'}
            </h1>
            <p className="text-gray-600 mb-2">{profileData?.email}</p>
            {profileData?.bio && (
              <p className="text-gray-700">{profileData.bio}</p>
            )}
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Demo Mode Profile
            </div>
          </div>
        </div>
      </div>

      {/* DID Information */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">DID Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decentralized Identifier (DID)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userDID.id}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
              />
              <button
                onClick={() => copyToClipboard(userDID.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wallet Address
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={userAddress || ''}
                readOnly
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm font-mono"
              />
              <button
                onClick={() => copyToClipboard(userAddress || '')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Copy
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created At
            </label>
            <input
              type="text"
              value={new Date(userDID.createdAt).toLocaleString()}
              readOnly
              className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Social Recovery */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Recovery</h2>
        <p className="text-gray-600 mb-6">
          Add trusted guardians who can help recover your identity if you lose access to your wallet.
        </p>

        {/* Current Guardians */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Guardians</h3>
          {guardians.length > 0 ? (
            <div className="space-y-3">
              {guardians.map((guardian, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600">🛡️</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {guardian.name || 'Guardian'}
                      </p>
                      <p className="font-mono text-sm text-gray-600">
                        {guardian.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      guardian.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {guardian.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <button
                      onClick={() => removeGuardian(guardian.address)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <p className="text-gray-600">No guardians added yet</p>
            </div>
          )}
        </div>

        {/* Add Guardian */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Guardian</h3>
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="Guardian name (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex space-x-4">
              <input
                type="text"
                value={newGuardian}
                onChange={(e) => setNewGuardian(e.target.value)}
                placeholder="Enter guardian wallet address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleAddGuardian}
                disabled={!newGuardian}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Add Guardian
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Guardians can help recover your identity through a 2-of-3 multi-signature process.
          </p>
        </div>
      </div>

      {/* DID Document */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">DID Document</h2>
        <div className="bg-gray-50 rounded-lg p-4 overflow-auto">
          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
            {JSON.stringify(userDID.document, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default Profile