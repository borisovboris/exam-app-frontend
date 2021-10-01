import { AbstractControl } from '@angular/forms';

export function MatchPasswords(formGroup: AbstractControl): void {

    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');

    if (confirmPassword?.errors && !confirmPassword.errors.passwordMatch) {
        return;
    }

    if (password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ passwordMatch: true });
    } else {
        confirmPassword?.setErrors(null);
    }

}
