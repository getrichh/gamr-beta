import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function CaseDialog({ selectedCard, onClose }: any) {
    return (
        <Dialog open={!!selectedCard} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedCard?.title}</DialogTitle>
                </DialogHeader>
                <p>{selectedCard?.description}</p>
            </DialogContent>
        </Dialog>
    );
}