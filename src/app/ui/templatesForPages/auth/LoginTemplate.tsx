import { LoginForm } from "../../organisms"

export const LoginTemplate = () => {
    return (
        <div className="min-h-screen flex  items-center justify-center ">
            <div className="w-full max-w-md  p-6 bg-white rounded-lg shadow-md">
                <LoginForm />
            </div>
        </div>
    )
}