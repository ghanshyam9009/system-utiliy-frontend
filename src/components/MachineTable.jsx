


// import React, { useEffect, useState } from "react";
// import { fetchAllMachines, fetchFilteredMachines } from "../services/api";
// import FilterModal from "./FilterModal";
// import IssueBadge from "./IssueBadge";
// import HistoryModal from "./Historymodal"; // New modal for history

// const MachineTable = () => {
//   const [machines, setMachines] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: "timestamp", direction: "desc" }); // default sort
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedMachineId, setSelectedMachineId] = useState(null); // for history modal

//   useEffect(() => {
//     loadMachines();
//   }, []);

//   const loadMachines = async () => {
//     const data = await fetchAllMachines();
//     // Default sort by timestamp descending
//     const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
//     setMachines(sortedData);
//   };

//   const applyFilter = async (filters) => {
//     const data = await fetchFilteredMachines(filters);
//     setMachines(data);
//     setShowFilter(false);
//   };

//   const sortBy = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
//     setSortConfig({ key, direction });

//     const sorted = [...machines].sort((a, b) => {
//       // support nested fields like sleep.sleepSeconds
//       const aValue = key.includes('.') ? key.split('.').reduce((o, i) => o[i], a) : a[key];
//       const bValue = key.includes('.') ? key.split('.').reduce((o, i) => o[i], b) : b[key];

//       if (aValue < bValue) return direction === "asc" ? -1 : 1;
//       if (aValue > bValue) return direction === "asc" ? 1 : -1;
//       return 0;
//     });

//     setMachines(sorted);
//   };

//   // Styles (same as before)
//   const styles = {
//     container: { padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
//     header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' },
//     title: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 },
//     subtitle: { fontSize: '14px', color: '#666', margin: '4px 0 0 0' },
//     filterButton: { padding: '10px 20px', backgroundColor: '#4a6cf7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' },
//     tableContainer: { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' },
//     table: { width: '100%', borderCollapse: 'collapse' },
//     tableHeaderCell: { padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' },
//     tableCell: { padding: '16px', fontSize: '14px', color: '#4a5568' }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//         <div style={styles.header}>
//           <div>
//             <h1 style={styles.title}>System Utility</h1>
//             <p style={styles.subtitle}>Machine health and status dashboard</p>
//           </div>
//           <button onClick={() => setShowFilter(true)} style={styles.filterButton}>
//             Filter Machines
//           </button>
//         </div>

//         {showFilter && <FilterModal onApply={applyFilter} onClose={() => setShowFilter(false)} />}

//         <div style={styles.tableContainer}>
//           <div style={{ overflowX: 'auto' }}>
//             <table style={styles.table}>
//               <thead>
//                 <tr>
//                   {[
//                     { key: "hostname", label: "Hostname" },
//                     { key: "platform", label: "Platform" },
//                     { key: "osUpdate.currentVersion", label: "OS Version" },
//                     { key: "diskEncryption.tool", label: "Disk" },
//                     { key: "antivirus.avList", label: "Antivirus" },
//                     { key: "sleep.sleepSeconds", label: "Sleep Seconds" },
//                     { key: "timestamp", label: "Last Check-in" }
//                   ].map((col) => (
//                     <th
//                       key={col.key}
//                       style={styles.tableHeaderCell}
//                       onClick={() => sortBy(col.key)}
//                     >
//                       {col.label}
//                       <SortIcon direction={sortConfig.key === col.key ? sortConfig.direction : ""} />
//                     </th>
//                   ))}
//                   <th style={styles.tableHeaderCell}>History</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {machines.map((m) => (
//                   <tr key={m.machineId}>
//                     <td style={styles.tableCell}>{m.hostname}</td>
//                     <td style={styles.tableCell}>{m.platform}</td>
//                     <td style={styles.tableCell}>
//                       <IssueBadge issue={!m.osUpdate?.isLatest}>{m.osUpdate?.currentVersion || "N/A"}</IssueBadge>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <IssueBadge issue={!m.diskEncryption?.diskEncrypted}>{m.diskEncryption?.tool || "N/A"}</IssueBadge>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <IssueBadge issue={!m.antivirus?.active}>{m.antivirus?.avList?.join(", ") || "N/A"}</IssueBadge>
//                     </td>
//                     <td style={styles.tableCell}>{m.sleep?.sleepSeconds || "N/A"}</td>
//                     <td style={styles.tableCell}>{new Date(m.timestamp).toLocaleString()}</td>
//                     <td style={styles.tableCell}>
//                       <button
//                         onClick={() => setSelectedMachineId(m.machineId)}
//                         style={{ padding: '6px 12px', backgroundColor: '#4a6cf7', color: 'white', borderRadius: '4px' }}
//                       >
//                         History
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* History Modal */}
//         {selectedMachineId && (
//           <HistoryModal
//             machineId={selectedMachineId}
//             onClose={() => setSelectedMachineId(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// const SortIcon = ({ direction }) => {
//   const iconStyle = {
//     width: '14px',
//     height: '14px',
//     color: direction ? '#4a6cf7' : '#cbd5e0',
//     transform: direction === 'desc' ? 'rotate(180deg)' : 'none',
//     transition: 'transform 0.2s, color 0.2s'
//   };

//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       style={iconStyle}
//       viewBox="0 0 20 20"
//       fill="currentColor"
//     >
//       <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//     </svg>
//   );
// };

// export default MachineTable;



import React, { useEffect, useState } from "react";
import { fetchAllMachines, fetchFilteredMachines } from "../services/api";
import FilterModal from "./FilterModal";
import IssueBadge from "./IssueBadge";
import HistoryModal from "./Historymodal";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to server

const MachineTable = () => {
  const [machines, setMachines] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "timestamp", direction: "desc" });
  const [showFilter, setShowFilter] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState(null);

  // Load initial machines
  useEffect(() => {
    loadMachines();
  }, []);

  // Socket.io listeners
  useEffect(() => {
    socket.on("newMachine", (machine) => {
      setMachines(prev => [machine, ...prev]);
    });

    socket.on("updateMachine", ({ updatedId, updatedFields }) => {
      setMachines(prev =>
        prev.map(m => m._id === updatedId ? { ...m, ...updatedFields } : m)
      );
    });

    socket.on("deleteMachine", (deletedId) => {
      setMachines(prev => prev.filter(m => m._id !== deletedId));
    });

    return () => {
      socket.off("newMachine");
      socket.off("updateMachine");
      socket.off("deleteMachine");
    };
  }, []);

  const loadMachines = async () => {
    const data = await fetchAllMachines();
    const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    setMachines(sortedData);
  };

  const applyFilter = async (filters) => {
    const data = await fetchFilteredMachines(filters);
    setMachines(data);
    setShowFilter(false);
  };

  const sortBy = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });

    const sorted = [...machines].sort((a, b) => {
      const aValue = key.includes('.') ? key.split('.').reduce((o, i) => o?.[i], a) : a?.[key];
      const bValue = key.includes('.') ? key.split('.').reduce((o, i) => o?.[i], b) : b?.[key];

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setMachines(sorted);
  };

  const styles = {
    container: { padding: '24px', backgroundColor: '#f8f9fa', minHeight: '100vh' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '16px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 },
    subtitle: { fontSize: '14px', color: '#666', margin: '4px 0 0 0' },
    filterButton: { padding: '10px 20px', backgroundColor: '#4a6cf7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: '500' },
    tableContainer: { backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse' },
    tableHeaderCell: { padding: '12px 16px', fontSize: '12px', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' },
    tableCell: { padding: '16px', fontSize: '14px', color: '#4a5568' }
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>System Utility</h1>
            <p style={styles.subtitle}>Machine health and status dashboard</p>
          </div>
          <button onClick={() => setShowFilter(true)} style={styles.filterButton}>
            Filter Machines
          </button>
        </div>

        {showFilter && <FilterModal onApply={applyFilter} onClose={() => setShowFilter(false)} />}

        <div style={styles.tableContainer}>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {[
                    { key: "hostname", label: "Hostname" },
                    { key: "platform", label: "Platform" },
                    { key: "osUpdate.currentVersion", label: "OS Version" },
                    { key: "diskEncryption.tool", label: "Disk" },
                    { key: "antivirus.avList", label: "Antivirus" },
                    { key: "sleep.sleepSeconds", label: "Sleep Seconds" },
                    { key: "timestamp", label: "Last Check-in" }
                  ].map((col) => (
                    <th
                      key={col.key}
                      style={styles.tableHeaderCell}
                      onClick={() => sortBy(col.key)}
                    >
                      {col.label}
                      <SortIcon direction={sortConfig.key === col.key ? sortConfig.direction : ""} />
                    </th>
                  ))}
                  <th style={styles.tableHeaderCell}>History</th>
                </tr>
              </thead>
              <tbody>
                {machines.map((m) => (
                  <tr key={m.machineId}>
                    <td style={styles.tableCell}>{m.hostname}</td>
                    <td style={styles.tableCell}>{m.platform}</td>
                    <td style={styles.tableCell}>
                      <IssueBadge issue={!m.osUpdate?.isLatest}>{m.osUpdate?.currentVersion || "N/A"}</IssueBadge>
                    </td>
                    <td style={styles.tableCell}>
                      <IssueBadge issue={!m.diskEncryption?.diskEncrypted}>{m.diskEncryption?.tool || "N/A"}</IssueBadge>
                    </td>
                    <td style={styles.tableCell}>
                      <IssueBadge issue={!(m.antivirus?.avList?.length > 0 && m.antivirus?.active)}>
                        {m.antivirus?.avList?.join(", ") || "N/A"}
                      </IssueBadge>
                    </td>
                    <td style={styles.tableCell}>{m.sleep?.sleepSeconds || "N/A"}</td>
                    <td style={styles.tableCell}>{new Date(m.timestamp).toLocaleString()}</td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => setSelectedMachineId(m.machineId)}
                        style={{ padding: '6px 12px', backgroundColor: '#4a6cf7', color: 'white', borderRadius: '4px' }}
                      >
                        History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedMachineId && (
          <HistoryModal
            machineId={selectedMachineId}
            onClose={() => setSelectedMachineId(null)}
          />
        )}
      </div>
    </div>
  );
};

const SortIcon = ({ direction }) => {
  const iconStyle = {
    width: '14px',
    height: '14px',
    color: direction ? '#4a6cf7' : '#cbd5e0',
    transform: direction === 'desc' ? 'rotate(180deg)' : 'none',
    transition: 'transform 0.2s, color 0.2s'
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
};

export default MachineTable;

