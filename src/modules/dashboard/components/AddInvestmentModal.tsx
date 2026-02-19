// import type { CalendarDate } from '@heroui/react'
import {
    Button,
    Form,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    NumberInput,
    Select,
    SelectItem,
    type SharedSelection,
} from '@heroui/react'
import type { CalendarDate } from '@internationalized/date'
import { getLocalTimeZone, today } from '@internationalized/date'
import { useState } from 'react'

import { AssetIcon } from '../../asset/components/AssetIcon'
import { ASSET_METADATA } from '../../asset/constants/assets'
import type { AssetSymbol } from '../../asset/types/assets.types'

const mockApiCall = ({
    data,
    delay = 2000,
    ok,
}: {
    data: FormState
    delay?: number
    ok: boolean
}) => {
    return new Promise<FormState>((resolve, reject) => {
        setTimeout(() => {
            if (ok) {
                resolve(data)
            } else {
                reject(new Error('Error al agregar inversión'))
            }
        }, delay)
    })
}

const ASSETS_SELECT_OPTIONS = Object.entries(ASSET_METADATA).map(([symbol, asset]) => ({
    key: symbol as AssetSymbol,
    label: asset.name + ' (' + symbol + ')',
    category: asset.category,
}))

export type FormState = {
    activo: AssetSymbol | null
    cantidad: number | null
    precioFinal: number | null
    fechaCompra?: CalendarDate | null
}
const defaultDate = today(getLocalTimeZone())

const initialFormData = {
    activo: null,
    cantidad: null,
    precioFinal: null,
    fechaCompra: defaultDate,
}
const AddInvestmentModal = ({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: FormState) => void
}) => {
    const [formData, setFormData] = useState<FormState>(initialFormData)

    const [errors, setErrors] = useState<Record<string, string>>({})

    const [loading, setLoading] = useState(false)

    const handleChange = (name: string, value: SharedSelection) => {
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Limpiar error del campo cuando se modifica
        if (errors[name]) {
            setErrors((prev) => {
                const { [name]: _omit, ...rest } = prev
                return rest
            })
        }
    }

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.activo) {
            newErrors.activo = 'Debe seleccionar un activo'
        }
        if (!formData.cantidad || formData.cantidad <= 0) {
            console.log('formData.!!!!!!!!!!!!!', formData.cantidad)
            newErrors.cantidad = 'Debe ingresar la cantidad'
        }

        if (!formData.precioFinal || formData.precioFinal <= 0) {
            newErrors.precioFinal = 'Debe ingresar el precio final'
        }
        // if (formData.fechaCompra === '') {
        //     console.log('formData.fechaCompra', formData.fechaCompra)
        //     newErrors.fechaCompra = 'Debe ingresar la fecha de compra'
        // }
        console.log('newErrors', newErrors)

        return newErrors
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))

        console.log(data)

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        mockApiCall({ data, delay: 2000, ok: true })
            .then((response) => {
                console.log(response)
                onSubmit(response)
                handleReset()
                handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })

        // // Convertir valores numéricos
        // const investmentData = {
        // 	activo: data.activo || formData.activo,
        // 	cantidad: parseFloat(data.cantidad || formData.cantidad),
        // 	precioFinal: parseFloat(data.precioFinal || formData.precioFinal),
        // 	fechaCompra: data.fechaCompra || formData.fechaCompra
        // }
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors({})
    }

    const handleClose = () => {
        handleReset()
        onClose()
    }
    return (
        <Modal isOpen={isOpen} onClose={handleClose} size="lg" placement="center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Agregar Inversión</ModalHeader>

                <ModalBody>
                    <Form
                        onReset={handleReset}
                        onSubmit={handleSubmit}
                        // validationErrors={errors}
                        className="flex flex-col gap-4"
                    >
                        <Select
                            name="activo"
                            label="Activo"
                            items={ASSETS_SELECT_OPTIONS}
                            value={formData.activo ?? undefined}
                            onSelectionChange={(value) => handleChange('activo', value)}
                            isInvalid={!!errors.activo}
                            errorMessage={errors.activo}
                            renderValue={(items) => {
                                return items.map((item) => (
                                    <div key={item.key} className="flex items-center gap-2">
                                        {/* <Avatar
                                            className="rounded-full w-6 h-6"
                                            icon={item.icon}
                                        /> */}
                                        <AssetIcon
                                            symbol={item.data?.key as AssetSymbol}
                                            className="w-6 h-6"
                                        />
                                        <span className="text-sm capitalize">
                                            {item.data?.label}
                                        </span>
                                    </div>
                                ))
                            }}
                        >
                            {(item) => (
                                <SelectItem key={item.key} textValue={item.label}>
                                    <div className="flex items-center gap-2">
                                        <AssetIcon symbol={item.key} className="w-6 h-6" />

                                        {/* <Avatar className='rounded-full w-6 h-6' icon={item.icon} /> */}
                                        <span>{item.label}</span>
                                    </div>
                                </SelectItem>
                            )}
                        </Select>

                        <section className="flex gap-4 w-full">
                            <NumberInput
                                label="Cantidad"
                                name="cantidad"
                                value={formData.cantidad ?? undefined}
                                onValueChange={(value) => handleChange('cantidad', value)}
                                errorMessage={errors.cantidad}
                                isInvalid={!!errors.cantidad}
                                hideStepper
                            />

                            <NumberInput
                                label="Precio por unidad"
                                name="precioFinal"
                                startContent={
                                    <div className="pointer-events-none flex items-center">
                                        <span className="text-default-400 text-small">$</span>
                                    </div>
                                }
                                value={formData.precioFinal ?? undefined}
                                isInvalid={!!errors.precioFinal}
                                errorMessage={errors.precioFinal}
                                onValueChange={(value) => handleChange('precioFinal', value)}
                                hideStepper
                            />
                        </section>
                        {/* <DatePicker
                            label="Fecha de compra"
                            name="fechaCompra"
                            value={formData.fechaCompra}
                            onChange={(value) => handleChange('fechaCompra', value)}
                            isInvalid={!!errors.fechaCompra}
                            errorMessage={errors.fechaCompra}
                        /> */}
                        <section className="flex gap-4 justify-end items-end w-full pt-4 pb-2">
                            <Button color="default" variant="light" onPress={handleClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" type="submit" isLoading={loading}>
                                Agregar
                            </Button>
                        </section>
                    </Form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddInvestmentModal
