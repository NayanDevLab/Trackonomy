interface PrivacySection {
    heading: string;
    paragraphs: string[];
}

const PRIVACY_POLICY: PrivacySection[] = [
    {
        heading: 'Introduction',
        paragraphs: [
            'Welcome to Trackonomy! This Privacy Policy explains how we collect, use, and protect your information when you use our application. Please read it carefully.',
        ],
    },
    {
        heading: '1. Information We Collect',
        paragraphs: [
            'We may collect personal data such as your email address, expense details, and device information to provide and improve our services.',
            'All financial information (e.g., expense amounts and categories) is stored securely and is not shared with third parties except as described in this policy.',
        ],
    },
    {
        heading: '2. How We Use Your Data',
        paragraphs: [
            'We use your data to maintain your account, generate expense reports, and enhance user experience.',
            'We do not sell or rent your personal information to third parties for marketing or other purposes.',
        ],
    },
    {
        heading: '3. Data Security',
        paragraphs: [
            'We take reasonable measures to protect your data from unauthorized access or disclosure.',
            'However, no security system is completely infallible. You are responsible for maintaining the confidentiality of your passwords and account information.',
        ],
    },
    {
        heading: '4. User Responsibilities',
        paragraphs: [
            'You are responsible for keeping your login credentials confidential and for any activities that occur under your account.',
            'If you suspect any unauthorized use of your account, please contact us immediately.',
        ],
    },
    {
        heading: '5. Changes to This Policy',
        paragraphs: [
            'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.',
            'Continued use of Trackonomy after any modification constitutes your acceptance of the revised policy.',
        ],
    },
    {
        heading: '6. Contact Us',
        paragraphs: [
            'If you have any questions or concerns about our Privacy Policy or data practices, please reach out through our official support channels.',
        ],
    },
    {
        heading: 'Conclusion',
        paragraphs: [
            'By using Trackonomy, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.',
        ],
    },
];

export default PRIVACY_POLICY;
