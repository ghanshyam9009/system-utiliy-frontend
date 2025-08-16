import React, { useState } from "react";

const FilterModal = ({ onApply, onClose }) => {
  const [filters, setFilters] = useState({
    sleepMin: "",
    sleepMax: "",
    avActive: "",
    diskEncrypted: "",
    osLatest: "",
    hostname: "",
    platform: "",
    only: "",
  });

  const handleChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });

  const handleApply = () => onApply(filters);

  // Styles
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '400px',
      maxHeight: '70vh', // 70% of viewport height
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    },
    modalContent: {
      padding: '24px',
      overflowY: 'auto', // Make content scrollable
      flex: 1
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      position: 'sticky',
      top: 0,
      backgroundColor: 'white',
      zIndex: 1,
      paddingBottom: '10px'
    },
    modalTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a1a1a',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: '#9ca3af',
      cursor: 'pointer',
      padding: '4px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#4b5563'
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: 'white',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '12px',
      marginTop: '24px',
      position: 'sticky',
      bottom: 0,
      backgroundColor: 'white',
      paddingTop: '16px'
    },
    cancelButton: {
      padding: '8px 16px',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      color: '#4b5563',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    applyButton: {
      padding: '8px 16px',
      backgroundColor: '#4a6cf7',
      border: 'none',
      borderRadius: '6px',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Advanced Filters</h2>
            <button 
              onClick={onClose} 
              style={styles.closeButton}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sleep Min</label>
                <input 
                  type="number" 
                  name="sleepMin" 
                  placeholder="e.g. 300" 
                  value={filters.sleepMin} 
                  onChange={handleChange} 
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Sleep Max</label>
                <input 
                  type="number" 
                  name="sleepMax" 
                  placeholder="e.g. 3600" 
                  value={filters.sleepMax} 
                  onChange={handleChange} 
                  style={styles.input}
                />
              </div>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Antivirus Status</label>
              <select 
                name="avActive" 
                value={filters.avActive} 
                onChange={handleChange} 
                style={styles.select}
              >
                <option value="">Any status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Disk Encryption</label>
              <select 
                name="diskEncrypted" 
                value={filters.diskEncrypted} 
                onChange={handleChange} 
                style={styles.select}
              >
                <option value="">Any status</option>
                <option value="true">Encrypted</option>
                <option value="false">Not Encrypted</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>OS Updates</label>
              <select 
                name="osLatest" 
                value={filters.osLatest} 
                onChange={handleChange} 
                style={styles.select}
              >
                <option value="">Any status</option>
                <option value="true">Up to date</option>
                <option value="false">Outdated</option>
              </select>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Hostname</label>
              <input 
                type="text" 
                name="hostname" 
                placeholder="Partial or full hostname" 
                value={filters.hostname} 
                onChange={handleChange} 
                style={styles.input}
              />
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Platform</label>
              <input 
                type="text" 
                name="platform" 
                placeholder="e.g. Windows, Mac" 
                value={filters.platform} 
                onChange={handleChange} 
                style={styles.input}
              />
            </div>
            
            {/* <div style={styles.formGroup}>
              <label style={styles.label}>Data Focus</label>
              <select 
                name="only" 
                value={filters.only} 
                onChange={handleChange} 
                style={styles.select}
              >
                <option value="">All Data</option>
                <option value="antivirus">Antivirus Only</option>
                <option value="os">OS Only</option>
              </select>
            </div> */}
          </div>
          
          <div style={styles.buttonGroup}>
            <button 
              onClick={onClose} 
              style={styles.cancelButton}
            >
              Cancel
            </button>
            <button 
              onClick={handleApply} 
              style={styles.applyButton}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;