export const formatAddress = (address: string): string => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

export const downloadFile = (content: string, filename: string, contentType: string = 'text/plain') => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const getCredentialTypeIcon = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'education':
      return '🎓'
    case 'employment':
      return '💼'
    case 'identity':
      return '🆔'
    case 'certification':
      return '📜'
    case 'license':
      return '📋'
    default:
      return '📄'
  }
}

export const getStatusColor = (status: string): { bg: string; text: string } => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'valid':
      return { bg: 'bg-green-100', text: 'text-green-800' }
    case 'revoked':
    case 'invalid':
      return { bg: 'bg-red-100', text: 'text-red-800' }
    case 'expired':
      return { bg: 'bg-orange-100', text: 'text-orange-800' }
    case 'pending':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800' }
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' }
  }
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateWalletAddress = (address: string): boolean => {
  const addressRegex = /^0x[a-fA-F0-9]{40}$/
  return addressRegex.test(address)
}