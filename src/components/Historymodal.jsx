


import React, { useEffect, useState } from "react";
import axios from "axios";

const HistoryModal = ({ machineId, onClose }) => {
  const [history, setHistory] = useState({ os: [], antivirus: [], disk: [], sleep: [] });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const [osRes, avRes, diskRes, sleepRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/history/os?machineId=${machineId}`),
          axios.get(`http://localhost:5000/api/history/antivirus?machineId=${machineId}`),
          axios.get(`http://localhost:5000/api/history/disk?machineId=${machineId}`),
          axios.get(`http://localhost:5000/api/history/sleep?machineId=${machineId}`),
        ]);
        setHistory({
          os: osRes.data,
          antivirus: avRes.data,
          disk: diskRes.data,
          sleep: sleepRes.data
        });
      } catch (err) {
        console.error("Error fetching history:", err);
      }
    };
    fetchHistory();
  }, [machineId]);

  const modalStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const contentStyle = {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '10px',
    width: '85%',
    maxHeight: '85%',
    overflowY: 'auto',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
  };

  const closeBtnStyle = {
    padding: '8px 16px',
    backgroundColor: '#f87171',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    float: 'right',
    fontWeight: 500
  };

  const sectionStyle = {
    marginBottom: '28px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    border: '1px solid #e2e8f0',
    marginTop: '8px'
  };

  const thStyle = {
    padding: '10px',
    border: '1px solid #e2e8f0',
    backgroundColor: '#4a6cf7',
    color: 'white',
    textAlign: 'left',
    fontWeight: 600
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #e2e8f0',
    verticalAlign: 'top'
  };

  const headerStyle = {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '16px',
    color: '#1a202c'
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={headerStyle}>History - Machine: {machineId}</h2>
          <button onClick={onClose} style={closeBtnStyle}>Close</button>
        </div>

        {/* OS History */}
        <div style={sectionStyle}>
          <h3 style={{ fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>OS History</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Timestamp</th>
                  <th style={thStyle}>Version</th>
                  <th style={thStyle}>Last Update</th>
                  <th style={thStyle}>Is Latest</th>
                </tr>
              </thead>
              <tbody>
                {history.os.map((item, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
                    <td style={tdStyle}>{item.currentVersion}</td>
                    <td style={tdStyle}>{new Date(item.lastUpdate).toLocaleString()}</td>
                    <td style={tdStyle}>{item.isLatest ? "✅" : "❌"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Antivirus History */}
{/* Antivirus History */}
<div style={sectionStyle}>
  <h3 style={{ fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>Antivirus History</h3>
  <div style={{ overflowX: 'auto' }}>
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Timestamp</th>
          <th style={thStyle}>Installed</th>
          <th style={thStyle}>Active</th>
          <th style={thStyle}>Antivirus List</th>
        </tr>
      </thead>
      <tbody>
        {history.antivirus.map((item, idx) => (
          <tr key={idx}>
            <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
            {/* Show ✅/❌ for each antivirus separately */}
            <td style={tdStyle}>
              {item.details?.map(av => av.status === "active" || av.status === "inactive" ? "✅" : "❌").join(" ")}
            </td>
            <td style={tdStyle}>
              {item.details?.map(av => av.status === "active" ? "✅" : "❌").join(" ")}
            </td>
            <td style={tdStyle}>{item.avList?.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


        {/* Disk History */}
        <div style={sectionStyle}>
          <h3 style={{ fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>Disk History</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Timestamp</th>
                  <th style={thStyle}>Encrypted</th>
                  <th style={thStyle}>Tool</th>
                  <th style={thStyle}>Percent</th>
                </tr>
              </thead>
              <tbody>
                {history.disk.map((item, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
                    <td style={tdStyle}>{item.diskEncrypted ? "✅" : "❌"}</td>
                    <td style={tdStyle}>{item.tool}</td>
                    <td style={tdStyle}>{item.percent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sleep History */}
        <div style={sectionStyle}>
          <h3 style={{ fontWeight: '600', marginBottom: '12px', color: '#2d3748' }}>Sleep History</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Timestamp</th>
                  <th style={thStyle}>Sleep Seconds</th>
                  <th style={thStyle}>Compliant</th>
                  <th style={thStyle}>Platform</th>
                </tr>
              </thead>
              <tbody>
                {history.sleep.map((item, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>{new Date(item.timestamp).toLocaleString()}</td>
                    <td style={tdStyle}>{item.sleepSeconds}</td>
                    <td style={tdStyle}>{item.compliant ? "✅" : "❌"}</td>
                    <td style={tdStyle}>{item.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
