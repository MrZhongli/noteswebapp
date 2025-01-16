'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type ArchiveConfirmationModalProps = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export default function ArchiveConfirmationModal({ isOpen, onClose, onConfirm }: ArchiveConfirmationModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Archive</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to archive this note?</p>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={onConfirm}>Archive</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

