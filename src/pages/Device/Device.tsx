import { useRef, useMemo, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { useAppStore } from '../../store'
import type { Device as DeviceType } from '../../store'
import { generateId } from '../../utils'
import Button from '../../components/Button'
import Toggle from '../../components/Toggle'
import './Device.scss'

interface DeviceProps {
  isMobile?: boolean
}

const Device = ({ isMobile = false }: DeviceProps) => {
  const { devices, addDevice, updateDevice } = useAppStore()
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})

  // Ensure we always have at least 2 devices - use useEffect for side effects
  useEffect(() => {
    if (devices.length === 0) {
      addDevice({
        id: generateId(),
        deviceType: 'Primary GPS',
        serialNumber: '',
        bringingOwnDevice: true,
        deviceImage: null,
      })
      addDevice({
        id: generateId(),
        deviceType: 'Secondary GPS',
        serialNumber: '',
        bringingOwnDevice: true,
        deviceImage: null,
      })
      addDevice({
        id: generateId(),
        deviceType: 'Drive mate Go',
        serialNumber: '',
        bringingOwnDevice: false,
        deviceImage: null,
      })
      addDevice({
        id: generateId(),
        deviceType: 'Lockbox',
        serialNumber: '',
        bringingOwnDevice: true,
        deviceImage: null,
      })
    } else if (devices.length === 1) {
      addDevice({
        id: generateId(),
        deviceType: 'Secondary GPS',
        serialNumber: '',
        bringingOwnDevice: true,
        deviceImage: null,
      })
      addDevice({
        id: generateId(),
        deviceType: 'Drive mate Go',
        serialNumber: '',
        bringingOwnDevice: false,
        deviceImage: null,
      })
      addDevice({
        id: generateId(),
        deviceType: 'Lockbox',
        serialNumber: '',
        bringingOwnDevice: true,
        deviceImage: null,
      })
    } else if (devices.length === 2) {
      addDevice({
        id: generateId(),
        deviceType: 'Drive mate Go',
        serialNumber: '',
        bringingOwnDevice: false,
        deviceImage: null,
      })
      addDevice({
        id: generateId(),
        deviceType: 'Lockbox',
        serialNumber: '',
        bringingOwnDevice: true,
        deviceImage: null,
      })
    } else if (devices.length === 3) {
      addDevice({
        id: generateId(),
        deviceType: 'Lockbox',
        serialNumber: '',
        bringingOwnDevice: true,
        deviceImage: null,
      })
    }
  }, [devices.length, addDevice])

  // Compute display devices without side effects
  const displayDevices = useMemo(() => {
    if (devices.length === 0) {
      return []
    }
    return devices.slice(0, 4) // Show only first 4 devices
  }, [devices])

  const handleDeviceChange = (id: string, field: string, value: string | boolean | null) => {
    updateDevice(id, { [field]: value } as Partial<DeviceType>)
  }

  const handleImageUpload = (id: string, event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result as string
        handleDeviceChange(id, 'deviceImage', imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    // Devices are already saved to store via handleDeviceChange
    // In a real app, this would navigate to the next step (Easy Access)
  }

  return (
    <div className={`device ${isMobile ? 'device--mobile' : 'device--desktop'}`}>
      <div className="device__container">
        <div className="device__header">
          <h1 className="device__title">Device management</h1>
          <p className="device__subtitle">
            Add details of the device, if any already installed on your car. If none, then continue
            to next step.
          </p>
        </div>

        <div className="device__content">
          {displayDevices.map((device, index) => (
            <div key={device.id} className="device__section">
              <h2 className="device__section-title">Device {index + 1}</h2>

              <div className="device__form">
                <div className="device__field">
                  <label htmlFor={`device-type-${device.id}`} className="device__label">
                    Device type
                  </label>
                  <select
                    id={`device-type-${device.id}`}
                    className="device__select"
                    value={device.deviceType}
                    onChange={(e) => handleDeviceChange(device.id, 'deviceType', e.target.value)}
                  >
                    <option value="Primary GPS">Primary GPS</option>
                    <option value="Secondary GPS">Secondary GPS</option>
                  </select>
                </div>

                <div className="device__field-row">
                  <div className="device__toggle-section">
                    <div className="device__toggle-header">
                      <span className="device__toggle-label">
                        Bringing your own device?
                      </span>
                      <Toggle
                        checked={device.bringingOwnDevice}
                        onChange={(e) =>
                          handleDeviceChange(device.id, 'bringingOwnDevice', e.target.checked)
                        }
                        aria-label={`Bringing your own device for Device ${index + 1}`}
                      />
                    </div>
                    <p className="device__toggle-help">
                      Toggle this on if you're bringing your own device. Leave it off if Drive mate
                      is to provide the device.
                    </p>
                  </div>
                </div>

                {device.bringingOwnDevice && (
                  <>
                    <div className="device__field device__field--flex">
                      <label htmlFor={`serial-number-${device.id}`} className="device__label">
                        Serial number
                      </label>
                      <input
                        id={`serial-number-${device.id}`}
                        type="text"
                        className="device__input"
                        value={device.serialNumber}
                        onChange={(e) =>
                          handleDeviceChange(device.id, 'serialNumber', e.target.value)
                        }
                        placeholder="Enter the serial number"
                      />
                    </div>

                    <div className="device__field">
                      <label className="device__label">Upload an image of the device</label>
                      <div
                        className="device__upload-area"
                        onClick={() => fileInputRefs.current[device.id]?.click()}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            fileInputRefs.current[device.id]?.click()
                          }
                        }}
                        aria-label={`Upload image for Device ${index + 1}`}
                      >
                        {device.deviceImage ? (
                          <img
                            src={device.deviceImage}
                            alt={`Device ${index + 1}`}
                            className="device__upload-preview"
                          />
                        ) : (
                          <div className="device__upload-placeholder">
                            <svg
                              className="device__upload-icon"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M12 5V19M5 12H19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span className="device__upload-text">Click to upload</span>
                          </div>
                        )}
                        <input
                          ref={(el) => {
                            fileInputRefs.current[device.id] = el
                          }}
                          type="file"
                          accept="image/*"
                          className="device__file-input"
                          onChange={(e) => handleImageUpload(device.id, e)}
                          aria-label={`Upload image for Device ${index + 1}`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="device__actions">
          <Button onClick={handleNext} className="device__next-button">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Device

