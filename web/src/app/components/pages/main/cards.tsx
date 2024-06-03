import React from 'react';
import LoginWithGitHub from '../../base/LoginWithGitHubforMain';
export default () => {
    return (
        <><section>
            <div className="pt-10 text-center justify-center ">
                <div className="px-12 grid grid-cols-1 text-black-capsule gap-x-12 gap-y-16 lg:px-0 md:py-8 lg:grid-cols-3 lg:gap-y-20 md:grid-cols-1 text-balance">
                    <div>
                        <div className="rounded overflow-hidden shadow-lg main-card">
                            <div className="px-6 py-4">
                                <div className="text-lg mb-2 font-semibold">From 10 to <span className="text-main-capsule">11</span></div>
                                <p className="font-medium text-gray-500">
                                    Messages are valid for 1 year. They will be delivered to you after 1 year and shared on the web if you choose to share them publicly.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="rounded overflow-hidden shadow-lg main-card">
                            <div className="px-6 py-4">
                                <div className="text-lg mb-2 font-semibold">From 10 to <span className="text-main-capsule">15</span></div>
                                <p className="font-medium text-gray-500">
                                    Messages are valid for 5 years. They will be delivered to you after 5 years and shared on the web if you choose to share them publicly.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className="rounded overflow-hidden shadow-lg main-card">
                                <div className="px-6 py-4">
                                    <div className="text-lg mb-2 font-semibold">From 10 to <span className="text-main-capsule">20</span></div>
                                    <p className="font-medium text-gray-500">
                                        Messages are valid for 10 years. They will be encrypted with an algorithm that can be opened after 10 years and shared publicly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            <section>
                <div className="px-12 max-w-xl mx-auto  text-black-capsule gap-x-12 gap-y-16 lg:px-0 md:py-8 lg:gap-y-20 text-white font-semibold text-sm justify-center text-balance">
                <LoginWithGitHub />
                </div>
            </section>
        </>

    )
}