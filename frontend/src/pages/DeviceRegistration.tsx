import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import {
  Device,
  DeviceCreate,
  DeviceDocument,
  DeviceStatus,
  DeviceType,
} from "@reminds/server";
import {
  Badge,
  Circle,
  CircleSlash,
  Edit,
  MoreHorizontal,
  Plus,
  Shield,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function DeviceRegistration(): JSX.Element {
  const [devices, setDevices] = useState<DeviceDocument[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchDevices = async () => {
    const devices = await api.get<DeviceDocument[]>(`/devices`, {
      token: token || undefined,
    });
    setDevices(devices);
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleDeleteDevice = async (deviceId: string) => {
    await api.delete(`/devices/${deviceId}`, {
      token: token || undefined,
    });
    fetchDevices();
  };

  const handleChangeStatus = async (deviceId: string, status: DeviceStatus) => {
    await api.put(`/devices/${deviceId}`, {
      data: {
        status,
      },
      token: token || undefined,
    });
    fetchDevices();
  };

  const handleEditDevice = async (
    deviceId: string,
    sslCertificate: string,
    sslKey: string
  ) => {
    await api.put(`/devices/${deviceId}`, {
      data: {
        sslCertificate,
        sslKey,
      },
      token: token || undefined,
    });
    fetchDevices();
  };

  const handleAddDevice = async (device: DeviceCreate) => {
    if (!device.deviceId || !device.deviceType) {
      return;
    }
    await api.post(`/devices`, {
      data: device,
      token: token || undefined,
    });
    fetchDevices();
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.pharmacyLocation?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full w-full flex-1 mx-auto gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Devices</h2>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search devices..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <AddDevice handleAddDevice={handleAddDevice} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Device ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Pharmacy Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredDevices.map((device) => (
            <TableRow key={device._id!.toString()}>
              <TableCell>{device.deviceId}</TableCell>
              <TableCell>{device.deviceType}</TableCell>
              <TableCell>{device.pharmacyLocation}</TableCell>
              <TableCell>{device.status.toUpperCase()}</TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="cursor-pointer">
                      <MoreHorizontal size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0" align="end">
                    <Command>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            className="cursor-pointer"
                            onSelect={() =>
                              handleChangeStatus(
                                device._id!.toString(),
                                device.status === DeviceStatus.BLOCKED
                                  ? DeviceStatus.ACTIVE
                                  : DeviceStatus.BLOCKED
                              )
                            }
                          >
                            {device.status === DeviceStatus.ACTIVE ? (
                              <>
                                <CircleSlash className="mr-2 h-4 w-4" />
                                Block
                              </>
                            ) : (
                              <>
                                <Circle className="mr-2 h-4 w-4" />
                                Unblock
                              </>
                            )}
                          </CommandItem>
                          <CommandItem className="cursor-pointer">
                            <EditDevice
                              handleEditDevice={handleEditDevice}
                              device={device}
                            />
                          </CommandItem>
                          <CommandItem
                            className="cursor-pointer"
                            onSelect={() =>
                              handleDeleteDevice(device._id!.toString())
                            }
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </CommandItem>
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
          {filteredDevices.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No devices found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function AddDevice({
  handleAddDevice,
}: {
  handleAddDevice: (device: DeviceCreate) => void;
}) {
  const { trialId } = useParams();
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<DeviceCreate>({
    deviceType: DeviceType.ANDROID,
    pharmacyLocation: "",
    trialId: trialId || "", // Initialize with the current trialId
    deviceId: "",
    sslCertificate: "",
    sslKey: "",
  });

  const handleSubmit = () => {
    handleAddDevice(device);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Add Device</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label>Device ID</Label>
          <Input
            type="text"
            placeholder="Device ID"
            value={device.deviceId}
            required
            onChange={(e) => setDevice({ ...device, deviceId: e.target.value })}
          />
          <Label>Device Type</Label>
          <Select
            onValueChange={(value) =>
              setDevice({ ...device, deviceType: value as DeviceType })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a device type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={DeviceType.IOS}>Apple</SelectItem>
              <SelectItem value={DeviceType.ANDROID}>Android</SelectItem>
            </SelectContent>
          </Select>
          <Label>Pharmacy Location</Label>
          <Input
            type="text"
            placeholder="Pharmacy Location"
            value={device.pharmacyLocation}
            onChange={(e) =>
              setDevice({ ...device, pharmacyLocation: e.target.value })
            }
            required
          />
          <Label>SSL Certificate</Label>
          <Textarea
            className="max-h-48 overflow-x-auto max-w-[450px] whitespace-nowrap"
            placeholder="SSL Certificate"
            value={device.sslCertificate}
            onChange={(e) =>
              setDevice({ ...device, sslCertificate: e.target.value })
            }
            required
          />
          <Label>SSL Key</Label>
          <Textarea
            className="max-h-48 overflow-x-auto max-w-[450px] whitespace-nowrap"
            placeholder="SSL Key"
            value={device.sslKey}
            onChange={(e) => setDevice({ ...device, sslKey: e.target.value })}
            rows={10}
            required
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Device
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditDevice({
  handleEditDevice,
  device,
}: {
  handleEditDevice: (
    deviceId: string,
    sslKey: string,
    sslCertificate: string
  ) => void;
  device: DeviceDocument;
}) {
  const [open, setOpen] = useState(false);
  const [editedDevice, setEditedDevice] = useState<{
    sslCertificate: string;
    sslKey: string;
  }>({
    sslCertificate: device.sslCertificate,
    sslKey: device.sslKey,
  });

  const handleSubmit = () => {
    handleEditDevice(
      device.deviceId,
      editedDevice.sslKey,
      editedDevice.sslCertificate
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-4">
          <Shield className="h-4" />
          SSL
        </div>
      </DialogTrigger>
      <DialogContent className="space-y-2">
        <DialogHeader>
          <DialogTitle>Edit Device {device.deviceId}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Label>SSL Certificate</Label>
          <Textarea
            className="max-h-48 overflow-x-auto max-w-[450px] whitespace-nowrap"
            placeholder="SSL Certificate"
            value={editedDevice.sslCertificate}
            required
            onChange={(e) =>
              setEditedDevice({
                ...editedDevice,
                sslCertificate: e.target.value,
              })
            }
          />
          <Label>SSL Key</Label>
          <Textarea
            className="max-h-48 overflow-x-auto max-w-[450px] whitespace-nowrap"
            placeholder="SSL Key"
            value={editedDevice.sslKey}
            required
            onChange={(e) =>
              setEditedDevice({
                ...editedDevice,
                sslKey: e.target.value,
              })
            }
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Add Device
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeviceRegistration;
