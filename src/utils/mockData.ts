import { Credential } from '../types'

export const generateMockCredentials = (userAddress: string): Omit<Credential, 'id'>[] => {
  const now = new Date()
  const oneYearFromNow = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000)
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000)
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

  return [
    {
      credentialHash: 'hash_education_degree_2024',
      issuer: '0x1234567890123456789012345678901234567890',
      subject: userAddress,
      issuedAt: sixMonthsAgo.toISOString(),
      expiresAt: oneYearFromNow.toISOString(),
      isRevoked: false,
      credentialType: 'Education',
      proofType: 'EcdsaSecp256k1Signature2019',
      signature: '0xabcdef...',
      metadata: {
        degree: 'Bachelor of Computer Science',
        institution: 'Tech University',
        gpa: '3.8',
        graduationDate: '2024-05-15',
        major: 'Computer Science',
        honors: 'Magna Cum Laude'
      }
    },
    {
      credentialHash: 'hash_employment_verification_2024',
      issuer: '0x9876543210987654321098765432109876543210',
      subject: userAddress,
      issuedAt: oneMonthAgo.toISOString(),
      isRevoked: false,
      credentialType: 'Employment',
      proofType: 'EcdsaSecp256k1Signature2019',
      signature: '0x123456...',
      metadata: {
        position: 'Senior Software Developer',
        company: 'TechCorp Inc.',
        startDate: '2023-01-15',
        department: 'Engineering',
        salary: '$120,000',
        employmentType: 'Full-time'
      }
    },
    {
      credentialHash: 'hash_certification_aws_2024',
      issuer: '0x5555666677778888999900001111222233334444',
      subject: userAddress,
      issuedAt: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(now.getTime() + 730 * 24 * 60 * 60 * 1000).toISOString(),
      isRevoked: false,
      credentialType: 'Certification',
      proofType: 'EcdsaSecp256k1Signature2019',
      signature: '0x789abc...',
      metadata: {
        certification: 'AWS Solutions Architect',
        level: 'Professional',
        certificationId: 'AWS-SAP-2024-001',
        validUntil: '2026-12-31',
        skills: ['Cloud Architecture', 'AWS Services', 'Security']
      }
    }
  ]
}

export const mockWalletAddresses = [
  '0x742d35Cc6634C0532925a3b8D4C9db96590c6C87',
  '0x8ba1f109551bD432803012645Hac136c30C6213',
  '0x1234567890123456789012345678901234567890',
  '0x9876543210987654321098765432109876543210'
]

export const mockInstitutions = [
  {
    name: 'Tech University',
    address: '0x1234567890123456789012345678901234567890',
    type: 'Educational Institution',
    verified: true
  },
  {
    name: 'TechCorp Inc.',
    address: '0x9876543210987654321098765432109876543210',
    type: 'Employer',
    verified: true
  },
  {
    name: 'AWS Training',
    address: '0x5555666677778888999900001111222233334444',
    type: 'Certification Authority',
    verified: true
  }
]