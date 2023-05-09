import React, { Component } from 'react'
import loupe from "../../../../../assets/icon/search.png";
class Detail extends Component {

    render(){
        return (
            <>
                <div className='border border-black m-1'>
                    <div className='flex flex-wrap'>
                        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N SGO/SIEBEL</label><input type="text" className='shadow-inner border'/></div>
                        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">N Affaire</label><input type="text" className='shadow-inner border'/></div>
                        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Libelle</label><input type="text" className='shadow-inner border'/></div>
                        <div className='flex flex-col w-fit m-1 text-sm'><label htmlFor="">Risque</label><input type="text" className='shadow-inner border'/></div>
                    </div>
                </div>
                <div className='p-1'>
                    <div className='my-1'>
                        <label>N Plan</label>
                        <input type="text" className='shadow-inner border w-[2rem]' />
                        <input type="text" className='shadow-inner border' />
                    </div>
                    <div className='flex gap-2 my-1'>
                        <div>
                            <label htmlFor="">Ligne Contrat SIEBEL</label>
                            <input type="text" className='shadow-inner border' />
                        </div>
                        <div>
                            <label htmlFor="">Service SIEBEL</label>
                            <input type="text" className='shadow-inner border' />
                        </div>
                        <button className='border border-gray-200 shadow-md p-[1px] flex gap-1'>
                            <img className='w-[1rem]' src={loupe} alt="search" srcSet="" />
                            Reconciliation SIEBEL
                        </button>
                    </div>
                    <div className='my-1'>
                        <label htmlFor="">Mode de gestion</label>
                        <input type="text" className='shadow-inner border' />
                        <input type="checkbox" name="" id="" />
                        <span>AODEX - Affich. 'Examen' (armoir a plan)</span>
                    </div>
                </div>
                <div className='m-1 border border-gray-600 p-1'>
                    <div className='flex gap-8'>
                        <div className='my-1'>
                            <label htmlFor="" className='inline-block w-[12rem]'>Destination</label>
                            <select name="" id="" className='shadow-inner border border-gray-800 bg-white px-2 py-1 text-sm'>
                                <option value="">Destionation#2</option>
                                <option value="">Destination#1</option>
                            </select>
                        </div>
                        <div className='my-1'>
                            <label htmlFor="" className='inline-block w-[12rem]'>Type d'affaire</label>
                            <select name="" id="" className='shadow-inner border border-gray-800 bg-white px-2 py-1 text-sm'>
                                <option value="">Affaire#2</option>
                                <option value="">Affaire#1</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="" className='inline-block w-[12rem]'>Charge affaire</label>
                            <input type="text" className='shadow-inner border' />
                            <input type="text" className='shadow-inner border' />
                        </div>
                    </div>
        
                    <div className='flex justify-between my-1'>
                        <div className=' flex'>
                            <label htmlFor="" className='inline-block w-[12rem]'>Montant des travaux</label>
                            <div className=''>
                                <input type="text" className='shadow-inner border' />
                                <select name="" id="" className='shadow-inner border border-gray-800 bg-white px-2 py-1 text-sm'>
                                    <option value="">Euro</option>
                                    <option value="">Dollar</option>
                                </select>
                                <select name="" id="" className='shadow-inner border border-gray-800 bg-white px-2 py-1 text-sm'>
                                    <option value="">TTC</option>
                                    <option value="">HT</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label htmlFor="" className='inline-block w-[12rem]'>Reference client</label>
                                <input type="text" className='shadow-inner border' />
                            </div>
                        </div>
                    </div>
        
                    <div className='my-1'>
                        <div className='flex'>
                            <label htmlFor="" className='inline-block w-[12rem]'>Reference client</label>
                            <textarea name="" className='shadow-innner border grow' id=""></textarea>
                        </div>
                    </div>
                </div>
        
                <div className='m-1 grid grid-cols-3'>
                    <div className='m-1 border border-gray-600 col-span-1 p-1'>
                        <div>
                            <div className='flex items-center gap-2 py-1'>
                                <label htmlFor="" className=''>Date début Prestation BV</label>
                                <input className='shadow-inner border w-[8rem]' type="date"/>
                            </div>
                        </div>

                        <div className='flex justify-between flex-col'>
                            <div>
                                <div className='flex items-center gap-2 py-1'>
                                <label htmlFor="" className=''>Date de début du chantier</label>
                                <input className='shadow-inner border w-[8rem]' type="date" />
                                </div>
                            </div>
                    
                            <div className=''>
                                <div className='flex items-center gap-3'>
                                    <label htmlFor="">Duree</label>
                                    <div className='flex items-center'>
                                        <input type="number" className='w-[3rem] shadow-inner border' />
                                    </div>
                                    <span>Mois</span>
                                </div>
                            </div>
                
                        </div>

                        <div>
                            <div className='flex items-center gap-2 py-1'>
                                <label htmlFor="" className=''>Date de fin</label>
                                <input className='shadow-inner border w-[8rem]' type="date"/>
                            </div>
                        </div>

                        <div className='flex justify-between'>
                            <div>
                                <div className='flex items-center gap-2 py-1'>
                                <label htmlFor="" className=''>Nb document a examiner</label>
                                <input className='shadow-inner border w-[6rem]' type="text"/>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='m-1 border border-gray-600 col-span-2 p-1'>
                        <div>
                            <label htmlFor="" className='inline-block w-full text-center mb-2'>Points de vigilence et risque associee</label>
                            <textarea name="" id="" className='w-full min-h-[5rem]'></textarea>
                        </div>
                        <div className='my-1 flex'>
                            <div>
                                <label htmlFor="" className=''>Risque</label>
                                <select name="" id="" className='shadow-inner border border-gray-800 bg-white px-2 py-1 text-sm'>
                                    <option value="">Normal#2</option>
                                    <option value="">Normal#1</option>
                                </select>
                            </div>
                            <div className='flex'>
                                <span>Nb prevus:</span>
                                <div className='flex justify-between'>
                                    <div><label htmlFor="">Visite/Reunion</label><input type="text" className='w-[2rem]'/></div>
                                    <div><label htmlFor="">Rapport Initiaux</label><input type="text" className='w-[2rem]'/></div>
                                    <div><label htmlFor="">Syntheses</label><input type="text" className='w-[2rem]'/></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
  
}

export default Detail