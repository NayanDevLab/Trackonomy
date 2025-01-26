// src/constants/termsContent.ts

interface TermsSection {
    heading: string;
    paragraphs: string[];
}

export const TERM_CONDITION: TermsSection[] = [
    {
        heading: 'Welcome to Trackonomy!',
        paragraphs: [
            'By using our application, you agree to the following terms and conditions. Please read them carefully.',
        ],
    },
    {
        heading: '1. Purpose of Trackonomy',
        paragraphs: [
            'Trackonomy is designed to help you record and monitor your personal expenses. It provides tools for budgeting, categorizing transactions, and viewing financial trends. It does not offer professional financial, investment, or legal advice. Any financial decisions you make based on information from Trackonomy are solely your responsibility.',
        ],
    },
    {
        heading: '2. Data Collection and Privacy',
        paragraphs: [
            'Trackonomy may store and process the data you enter, such as expense amounts, transaction dates, and categories. We respect your privacy and strive to protect your data in accordance with our privacy policy. However, you are responsible for keeping your device secure and ensuring you protect sensitive information like passwords or private financial details.',
        ],
    },
    {
        heading: '3. User Responsibilities',
        paragraphs: [
            'Ensure the accuracy of the data you enter. Inaccurate or incomplete information may affect the reliability of expense reports.',
            'Use Trackonomy only for lawful purposes and in accordance with all applicable laws and regulations.',
            'Maintain the confidentiality of your login credentials if the application requires account registration.',
        ],
    },
    {
        heading: '4. Limitations and Liability',
        paragraphs: [
            'Trackonomy is provided on an “as is” basis without warranties of any kind. While we aim to keep the application reliable, we do not guarantee error-free operation, uninterrupted service, or that data will always be complete or up to date. Under no circumstances shall Trackonomy be liable for any financial loss, direct or indirect, arising from the use or inability to use the application.',
        ],
    },
    {
        heading: '5. Modifications',
        paragraphs: [
            'We reserve the right to modify or discontinue any features of Trackonomy at any time, with or without notice. We also may update these terms periodically. Continued use of the application after any modification constitutes your acceptance of the revised terms.',
        ],
    },
    {
        heading: '6. Termination',
        paragraphs: [
            'We may suspend or terminate your access to Trackonomy if you violate these terms or engage in any conduct deemed harmful or unlawful. Upon termination, any rights or licenses granted to you will immediately end.',
        ],
    },
    {
        heading: '7. Contact Us',
        paragraphs: [
            'If you have questions or concerns about these terms or the functionality of Trackonomy, please reach out through our official support channels.',
            'By continuing to use Trackonomy, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.',
        ],
    },
];

export default TERM_CONDITION;
