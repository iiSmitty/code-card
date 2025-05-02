import {useEffect, useState} from 'react';
import './BusinessCardGenerator.css';

export default function BusinessCardGenerator() {
    // Sample template data
    const sampleTemplate = {
        name: 'Bruce Wayne',
        title: 'CEO, Wayne Enterprises',
        email: 'bruce@wayneenterprises.com',
        link: 'wayneenterprises.com'
    };

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        email: '',
        link: ''
    });

    const [url, setUrl] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [copyStatus, setCopyStatus] = useState('');

    // Load data from URL if present
    useEffect(() => {
        const hash = window.location.hash;
        if (hash.startsWith('#data=')) {
            try {
                const decodedData = JSON.parse(atob(hash.substring(6)));
                setFormData(decodedData);
            } catch (e) {
                console.error('Failed to parse URL data:', e);
            }
        }
    }, []);

    // Update shareable URL when formData changes
    useEffect(() => {
        const encodedData = btoa(JSON.stringify(formData));
        const baseUrl = window.location.href.split('#')[0];
        setUrl(`${baseUrl}#data=${encodedData}`);
    }, [formData]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Load sample template
    const loadSampleTemplate = () => {
        setFormData(sampleTemplate);
        setCopyStatus('Sample template loaded!');
        setTimeout(() => setCopyStatus(''), 3000);
    };

    // Generate and download card as PNG
    const downloadAsPNG = () => {
        const cardElement = document.getElementById('card-preview');
        cardElement.classList.add('capturing');

        import('html2canvas').then(({ default: html2canvas }) => {
            html2canvas(cardElement, {
                backgroundColor: '#282a36',
                useCORS: true,
                logging: false
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = formData.name ?
                    `${formData.name.replace(/\s+/g, '_')}_card.png` :
                    'business_card.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
                cardElement.classList.remove('capturing');

            }).catch(err => {
                console.error("html2canvas error:", err);
                cardElement.classList.remove('capturing');
                setCopyStatus('Error generating PNG.');
                setTimeout(() => setCopyStatus(''), 3000);
            });
        }).catch(err => {
            console.error("Failed to load html2canvas:", err);
            setCopyStatus('Error loading download library.');
            setTimeout(() => setCopyStatus(''), 3000);
        });
    };

    // Copy shareable link to clipboard
    const copyLink = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                setCopyStatus('Link copied to clipboard!');
                setTimeout(() => setCopyStatus(''), 3000);
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                setCopyStatus('Failed to copy link.');
                setTimeout(() => setCopyStatus(''), 3000);
            });
    };

    // Toggle QR code display
    const toggleQR = () => {
        if (!showQR) {
            try {
                require.resolve('qrcode.react');
                import('qrcode.react').then(() => {
                    setShowQR(true);
                }).catch(err => {
                    console.error('Failed to load QR code component:', err);
                    setCopyStatus('Could not load QR code generator.');
                    setTimeout(() => setCopyStatus(''), 3000);
                });
            } catch (e) {
                console.error('qrcode.react package not found:', e);
                setCopyStatus('QR code package not installed.');
                setTimeout(() => setCopyStatus(''), 3000);
            }
        } else {
            setShowQR(false);
        }
    };

    return (
        <div className="app-container">
            <div className="form-container">
                <h2 className="form-title">Business Card Details</h2>

                {/* Sample Template Button */}
                <div className="template-section">
                    <button
                        onClick={loadSampleTemplate}
                        className="template-button"
                    >
                        Load Sample Template
                    </button>
                </div>

                {/* Form Groups */}
                <div className="form-group">
                    <label htmlFor="name-input" className="form-label">Name</label>
                    <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Bruce Wayne"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title-input" className="form-label">Title</label>
                    <input
                        id="title-input"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Vigilante of Gotham"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email-input" className="form-label">Email</label>
                    <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., alfred@wayne.manor"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="link-input" className="form-label">Website / Link</label>
                    <input
                        id="link-input"
                        type="text"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., wayneenterprises.com"
                    />
                </div>

                {/* Button Group */}
                <div className="button-group">
                    <button
                        onClick={downloadAsPNG}
                        className="action-button download-button"
                    >
                        Download as PNG
                    </button>

                    <button
                        onClick={copyLink}
                        className="action-button share-button"
                    >
                        Copy Shareable Link
                    </button>

                    <button
                        onClick={toggleQR}
                        className="action-button qr-button"
                    >
                        {showQR ? 'Hide' : 'Show'} QR Code
                    </button>
                </div>

                {/* Status message */}
                {copyStatus && (
                    <p className={`status-message ${copyStatus.includes('Failed') || copyStatus.includes('Error') || copyStatus.includes('Could not load') || copyStatus.includes('not installed') ? 'error' : 'success'}`}>
                        {copyStatus}
                    </p>
                )}

                {/* QR Code Section */}
                {showQR && (
                    <div className="qr-container">
                        {(() => {
                            try {
                                const QRCodeSVG = require('qrcode.react').QRCodeSVG;
                                return <QRCodeSVG
                                    value={url}
                                    size={180}
                                    bgColor={"#ffffff"}
                                    fgColor={"#000000"}
                                    level={"L"}
                                />;
                            } catch (e) {
                                console.error("QR Code Error:", e);
                                return <p className="qr-error">QR Code failed to load. Ensure qrcode.react is installed.</p>;
                            }
                        })()}
                        <p className="qr-text">Scan to view this card's shareable link</p>
                    </div>
                )}
            </div>

            {/* Card Preview */}
            <div className="preview-container">
                <h2 className="preview-title">Live Preview</h2>
                <div className="preview-scroll-wrapper">
                    <div id="card-preview" className="card-preview">
                        <div className="window-title">
                            <div className="window-controls">
                                <span className="window-button close"></span>
                                <span className="window-button minimize"></span>
                                <span className="window-button maximize"></span>
                            </div>
                            <span className="window-name">BusinessCard.json</span>
                        </div>
                        <div className="menu-bar">
                            <span className="menu-item active">File</span>
                            <span className="menu-item">Edit</span>
                            <span className="menu-item">View</span>
                            <span className="menu-item">Run</span>
                            <span className="menu-item">Help</span>
                        </div>
                        <div className="code-editor">
                            <div className="line-numbers">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="line-number">{i + 1}</div>
                                ))}
                            </div>
                            <pre className="code-content"><code>
                            <div className="code-line"><span className="code-punctuation punc-brace">{`{`}</span></div>
                            <div className="code-line">
                                <span className="code-indent">  </span><span className="code-key">"name"</span><span className="code-punctuation punc-colon">:</span> <span className="code-value string">"{formData.name}"</span><span className="code-punctuation punc-comma">,</span>
                            </div>
                            <div className="code-line">
                                <span className="code-indent">  </span><span className="code-key">"title"</span><span className="code-punctuation punc-colon">:</span> <span className="code-value string">"{formData.title}"</span><span className="code-punctuation punc-comma">,</span>
                            </div>
                            <div className="code-line">
                                <span className="code-indent">  </span><span className="code-key">"email"</span><span className="code-punctuation punc-colon">:</span> <span className="code-value string">"{formData.email}"</span><span className="code-punctuation punc-comma">,</span>
                            </div>
                            <div className="code-line">
                                <span className="code-indent">  </span><span className="code-key">"link"</span><span className="code-punctuation punc-colon">:</span> <span className="code-value string">"{formData.link}"</span>
                            </div>
                            <div className="code-line"><span className="code-punctuation punc-brace">{`}`}</span></div>
                        </code></pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}