import React from 'react'
import { useStore } from '../store/useStore'

const NFTIdentity: React.FC = () => {
  const { userDID } = useStore()

  const exportToPDF = () => {
    alert('PDF export functionality would be implemented here')
  }

  const addToWallet = () => {
    alert('Add to wallet functionality would be implemented here')
  }

  if (!userDID) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No NFT Identity</h2>
          <p className="text-gray-600 mb-6">
            You need to create a DID first to mint your NFT identity card.
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

  const nftData = {
    name: `DeID Identity Card - ${userDID.profileData.name}`,
    description: `Decentralized Identity Card for ${userDID.profileData.name}`,
    image: userDID.profileData.profileImage || 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
    attributes: [
      { trait_type: "DID", value: userDID.id },
      { trait_type: "Name", value: userDID.profileData.name },
      { trait_type: "Created", value: new Date(userDID.createdAt).toISOString().split('T')[0] },
      { trait_type: "Status", value: "Active" }
    ]
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              NFT Identity Card
            </h1>
            <p className="text-gray-600">
              Your unique digital identity stored on the blockchain
            </p>
            <div className="mt-2 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              Demo Mode - Virtual NFT
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={exportToPDF}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Export PDF
            </button>
            <button
              onClick={addToWallet}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Add to Wallet
            </button>
          </div>
        </div>
      </div>

      {/* NFT Card Display */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-transparent"></div>
            <div className="absolute top-4 right-4 w-32 h-32 border border-white rounded-full opacity-20"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rounded-full opacity-20"></div>
          </div>

          {/* Card Content */}
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1">DeID Identity Card</h2>
                <p className="text-blue-100">Decentralized Identity NFT</p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🆔</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {userDID.profileData.profileImage ? (
                  <img
                    src={userDID.profileData.profileImage}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">👤</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{nftData.name}</h3>
                <p className="text-blue-100 text-sm mb-1">{nftData.description}</p>
                <div className="flex items-center space-x-2 text-xs text-blue-200">
                  <span>DID:</span>
                  <span className="font-mono">{userDID.id.slice(0, 20)}...</span>
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {nftData.attributes.map((attr, index) => (
                <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="text-xs text-blue-200 mb-1">{attr.trait_type}</div>
                  <div className="text-sm font-medium truncate">{attr.value}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-blue-200">
              <div>
                <span>Blockchain: Demo Mode</span>
              </div>
              <div>
                <span>Standard: ERC-721</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NFT Details */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">NFT Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium text-gray-900">{nftData.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Description:</span>
                <p className="text-gray-900">{nftData.description}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Token Standard:</span>
                <p className="font-medium text-gray-900">ERC-721</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Blockchain:</span>
                <p className="font-medium text-gray-900">Demo Mode</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attributes</h3>
            <div className="space-y-3">
              {nftData.attributes.map((attr, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-600">{attr.trait_type}:</span>
                  <span className="font-medium text-gray-900">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={exportToPDF}
            className="flex items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all duration-200"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">📄</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Export PDF</h3>
              <p className="text-sm text-gray-600">Download as PDF document</p>
            </div>
          </button>

          <button
            onClick={addToWallet}
            className="flex items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">👛</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Add to Wallet</h3>
              <p className="text-sm text-gray-600">View in MetaMask</p>
            </div>
          </button>

          <button
            onClick={() => alert('OpenSea integration would be implemented here')}
            className="flex items-center justify-center p-6 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🌊</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">View on OpenSea</h3>
              <p className="text-sm text-gray-600">See on marketplace</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NFTIdentity