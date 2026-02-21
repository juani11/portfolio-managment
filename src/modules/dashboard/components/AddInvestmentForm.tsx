import {
    Button,
    DatePicker,
    Form,
    NumberInput,
    Select,
    SelectItem,
    type SharedSelection,
} from '@heroui/react'
import type { DateValue } from '@internationalized/date'

import { AssetIcon } from '../../asset/components/AssetIcon'
import { ASSET_METADATA } from '../../asset/constants/assets'
import type { AssetSymbol } from '../../asset/types/assets.types'
import type { FormState } from './AddInvestmentModal'

const ASSETS_SELECT_OPTIONS = Object.entries(ASSET_METADATA).map(([symbol, asset]) => ({
    key: symbol as AssetSymbol,
    label: asset.name + ' (' + symbol + ')',
    category: asset.category,
}))

const AddInvestmentForm = ({
    formData,
    errors,
    handleChange,
    handleReset,
    handleSubmit,
    handleClose,
    loading,
}: {
    formData: FormState
    errors: Record<string, string>
    handleChange: (name: string, value: SharedSelection | number | DateValue | null) => void
    handleReset: () => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    handleClose: () => void
    loading: boolean
}) => {
    return (
        <Form onReset={handleReset} onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                            <AssetIcon symbol={item.data?.key as AssetSymbol} className="w-6 h-6" />
                            <span className="text-sm capitalize">{item.data?.label}</span>
                        </div>
                    ))
                }}
            >
                {(item) => (
                    <SelectItem key={item.key} textValue={item.label}>
                        <div className="flex items-center gap-2">
                            <AssetIcon symbol={item.key} className="w-6 h-6" />
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
            <DatePicker
                label="Fecha de compra"
                name="fechaCompra"
                value={formData.fechaCompra}
                onChange={(value) => handleChange('fechaCompra', value ?? null)}
                isInvalid={!!errors.fechaCompra}
                errorMessage={errors.fechaCompra}
            />
            <section className="flex gap-4 justify-end items-end w-full pt-4 pb-2">
                <Button color="default" variant="light" onPress={handleClose}>
                    Cancelar
                </Button>
                <Button color="primary" type="submit" isLoading={loading}>
                    Agregar
                </Button>
            </section>
        </Form>
    )
}

export default AddInvestmentForm
