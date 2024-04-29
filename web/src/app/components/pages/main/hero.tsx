export default () => {
    return (
        <section>
            <div className="py-12 mx-auto text-center lg:text-left lg:px-4 md:px-12 md:py-8 md:text-center md:text-baseline">
                <div className="grid items-center grid-cols-1 gap-4 list-none lg:grid-cols-2 lg:gap-24">
                    <div>
                        <p className="mt-8 text-4xl font-semibold tracking-tight lg:text-left text-black-kubezy max-w-screen-xl md:text-center md:text-baseline">
                        Kubernetes 10th Year Time Capsule Project
                        </p>
                        <p className="mt-4 text-base font-medium text-gray-500">
                        This project created to celebrate the 10th anniversary of Kubernetes and immortalize this important milestone. We aim to create a 
                        memorial for those who have made significant contributions to the development and impact of Kubernetes, including users and community members.
                        </p>
                    </div>
                    <div className="p-2 border rounded-3xl">
                        <div className="h-full overflow-hidden bg-white border shadow-lg rounded-3xl">
                            <img alt="KubeCapsule Logo" className="relative w-full rounded-2xl" src="/logo/logo-colored.svg"></img>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}