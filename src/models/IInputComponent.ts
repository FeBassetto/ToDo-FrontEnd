export default interface IInputComponent {
    type: 'text' | 'email' | 'number' | 'file' | 'password'
    name: 'name' | 'email' | 'password' | 'confirmpassword' | 'phone' | 'image',
    placeholder?: String,
    handleOnChange: any,
    value: any
}