import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";

const styles = {
    primary: "text-bg-primary",
    danger: "text-bg-danger",
    success: "text-bg-success",
    info: "text-bg-info"
}

const TIMEOUT = 3000;

interface ToastConfig { visible: boolean, style?: string, message: string }

@Injectable({
    providedIn: "root"
})
export class ToastService {
    private toast = new BehaviorSubject<ToastConfig>({ visible: false, style: styles.primary, message: "" });
    toast$ = this.toast.asObservable();

    constructor() {
        this.toast.pipe(tap(config => {
            if (config.visible) {
                // Close the toast after 3 seconds
                setTimeout(() => {
                    this.closeToast();
                }, 3000);
            }
        })).subscribe();
    }

    showToast(message: string = "Success") {
        this.showToastWithStyle(styles.primary, message);
    }

    showDangerToast(message: string = "Failed") {
        this.showToastWithStyle(styles.danger, message);
    }

    showSuccessToast(message: string = "Success") {
        this.showToastWithStyle(styles.success, message);
    }

    showInfoToast(message: string = "Info") {
        this.showToastWithStyle(styles.info, message);
    }

    closeToast() {
        this.toast.next({ visible: false, message: "" });
    }

    private showToastWithStyle(style: string, message: string) {
        this.toast.next({ visible: true, style, message });
        // this.closeToast$.next();
    }
}