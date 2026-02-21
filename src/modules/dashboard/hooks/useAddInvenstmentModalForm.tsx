import type { SharedSelection } from '@heroui/react'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { useEffect, useState } from 'react'

import { ASSET_METADATA } from '../../asset/constants/assets'
import type { AssetSymbol } from '../../asset/types/assets.types'
import { mockApiCall } from '../../core/services/services'
import type { FormState } from '../components/AddInvestmentModal'
import { useInvestmentsStore } from '../states/investments.state'

const defaultDate: DateValue = today(getLocalTimeZone())

const initialFormData = {
    activo: null,
    cantidad: null,
    precioFinal: null,
    fechaCompra: defaultDate,
}

const useAddInvenstmentModalForm = ({
    closeAddInvestmentModal,
}: {
    closeAddInvestmentModal: () => void
}) => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<FormState>(initialFormData)
    const [errors, setErrors] = useState<Record<string, string>>({})

    const addInvestment = useInvestmentsStore((state) => state.addInvestment)

    const handleAddInvestment = (investmentData: FormState) => {
        console.log('Nueva inversión:', investmentData)

        // const date = formatter.format(investmentData.fechaCompra.toDate())
        // console.log('DATE DE LA INVERSION FORMATEADA!!', date)

        if (!investmentData.activo) {
            throw new Error('Debe seleccionar un activo')
        }

        const assetObject = ASSET_METADATA[investmentData.activo]
        addInvestment({
            id: window.crypto.randomUUID(),
            asset: { ...assetObject, symbol: investmentData.activo },
            amount: Number(investmentData.precioFinal),
            quantity: Number(investmentData.cantidad),
            date: investmentData.fechaCompra.toDate(getLocalTimeZone()),
        })
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
        if (!formData.fechaCompra) {
            console.log('formData.fechaCompra', formData.fechaCompra)
            newErrors.fechaCompra = 'Debe ingresar la fecha de compra'
        }
        console.log('newErrors', newErrors)

        return newErrors
    }

    const handleChange = (name: string, value: SharedSelection | number | DateValue | null) => {
        console.log('value handleChange', value)
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Limpiar error del campo cuando se modifica
        if (errors[name]) {
            setErrors((prev) => {
                const { [name]: _omit, ...rest } = prev
                return rest
            })
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = Object.fromEntries(new FormData(e.currentTarget))

        console.log('formData state', formData)
        console.log('data fromEntries', data)
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setLoading(true)
        mockApiCall({
            data,
            delay: 2000,
            ok: true,
            errorMessage: 'Error al agregar inversión',
        })
            .then((response) => {
                console.log(response)
                const newInvestmentData = {
                    activo: response.activo as AssetSymbol,
                    cantidad: Number(response.cantidad),
                    precioFinal: Number(response.precioFinal),
                    fechaCompra: formData.fechaCompra,
                }
                handleAddInvestment(newInvestmentData)
                handleReset()
                handleClose()
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleReset = () => {
        setFormData(initialFormData)
        setErrors({})
    }

    const handleClose = () => {
        handleReset()
        closeAddInvestmentModal()
    }

    useEffect(() => {
        console.log('formData useEffect', formData)
    }, [formData])

    return {
        loading,
        formData,
        errors,
        handleChange,
        handleReset,
        handleSubmit,
        handleClose,
    }
}

export default useAddInvenstmentModalForm
