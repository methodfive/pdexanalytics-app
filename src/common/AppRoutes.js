import React from "react";
import {Routes, Route} from "react-router-dom";
import { Overview } from "../pages/Overview";
import NotFound from "../pages/NotFound";
import {Trades} from "../pages/Trades";
import {Ecosystem} from "../pages/Ecosystem";
import {Markets} from "../pages/Markets";
import {Assets} from "../pages/Assets";
import {Asset} from "../pages/Asset";
import {Market} from "../pages/Market";

export const AppRoutes = () => {
      return (
        <div className="body-content row">
            <div className="col">
                <div className="h-100">
                    <Routes>
                        <Route index element={<Overview />} />
                        <Route path="/trades" element={<Trades />} />
                        <Route path="/ecosystem" element={<Ecosystem />} />
                        <Route path="/markets" element={<Markets />} />
                        <Route path="/markets/:slug" element={<Market />} />
                        <Route path="/assets" element={<Assets />} />
                        <Route path="/assets/:slug" element={<Asset />} />
                        <Route path="*" element={<NotFound/>} status={404} />
                    </Routes>
                </div>
            </div>
        </div>
      )
};