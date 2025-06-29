import React from 'react'
import { useStore } from '../store/useStore'
import { formatAddress } from '../utils/helpers'
import Button from './ui/Button'

const WalletButton: React.FC = () => {
  const { userAddress, connectWallet, disconnectWallet, isConnected, isLoading } = useStore()

  if (isConnected && userAddress) {
    return (
      <div className="flex items-center space-x-4">
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
          Demo Mode
        </span>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            {formatAddress(userAddress)}
          </span>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={disconnectWallet}
        >
          Disconnect
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWallet}
      loading={isLoading}
      size="md"
    >
      Connect Wallet (Demo)
    </Button>
  )
}

export default WalletButton