// import type { CalendarDate } from '@heroui/react'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react'
import { type DateValue } from '@internationalized/date'

import type { AssetSymbol } from '../../asset/types/assets.types'
import useAddInvenstmentModalForm from '../hooks/useAddInvenstmentModalForm'
import AddInvestmentForm from './AddInvestmentForm'

export type FormState = {
    activo: AssetSymbol | null
    cantidad: number | null
    precioFinal: number | null
    fechaCompra: DateValue
}

const AddInvestmentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { loading, formData, errors, handleChange, handleReset, handleSubmit, handleClose } =
        useAddInvenstmentModalForm({
            closeAddInvestmentModal: onClose,
        })
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg" placement="center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Agregar Inversión</ModalHeader>
                <ModalBody>
                    <AddInvestmentForm
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                        handleReset={handleReset}
                        handleSubmit={handleSubmit}
                        handleClose={handleClose}
                        loading={loading}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddInvestmentModal
