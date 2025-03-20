import React, { useState } from "react";

const DeviceRegistration: React.FC = () => {
  const [deviceId, setDeviceId] = useState("");
  const [type, setType] = useState<"android" | "apple">("android");

  const handleRegister = async () => {
    // Implement device registration logic
  };

  return (
    <div>
      <h2>Register Device</h2>
      <input
        type="text"
        placeholder="Device ID"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "android" | "apple")}
      >
        <option value="android">Android</option>
        <option value="apple">Apple</option>
      </select>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default DeviceRegistration;
