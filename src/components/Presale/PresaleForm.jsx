import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { useAccount, useDisconnect, useProvider, useSigner } from "wagmi";
import CustomModal from "./CustomModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ethers } from "ethers";
import CONFIG from "../../abi/config.json"
import abi from "../../abi/abi.json"
import abiSecond from "../../abi/abiSecond.json"
import { parseUnits } from "ethers/lib/utils.js";

const PresaleForm = () => {
    const icoAddress = CONFIG.ICO_CONTRACT_ADDRESS;
    const approveUSDT = CONFIG.USDT_ADDRESS;
    const [showModal, setShowModal] = useState(false);
    const Price = useRef(null);

  var handleClose = () => setShowModal(false);

  var handleSuccess = () => {
    console.log("success");
  };
    const Provider = useProvider();
  const{ data: signer} = useSigner();
  console.log({ Provider, signer })
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  })
  const [message, setMessage] = useState('')
    const data = [
        {
          title: "Presale Price",
          value: " 1 LAST = 0.3 USDT",
        },
        {
            title: "Token standard",
            value: "ERC-20",
        },
        {
            title: "Total Supply",
            value: "25.000.000 LAST",
        },
        {
            title: "Accepted currencies",
            value: "USDT",
        }
    ]

    const purchase = async () => {
        if (!window.ethereum) {
            toast.error("Please install metamask", {
                position: toast.POSITION.TOP_CENTER,
                darkMode: true,
            });
            return;
          }
        else if (!account.address) {
            toast.error("Please connect your wallet first", {
                position: toast.POSITION.TOP_CENTER,
                darkMode: true,
            })
            return;
        }
        else if ( Price.current.value === "" || Price.current.value === null ) {
            toast.error("Please enter the amount", {
                position: toast.POSITION.TOP_CENTER,
                darkMode: true,
            })
            return;
                              
        }
        else if ( Price.current.value > 5000 || Price.current.value < 20 ) {
          toast.error("Max amount is 5000 and Min amount is 20", {
              position: toast.POSITION.TOP_CENTER,
              darkMode: true,
          })
          return;
                            
      }
        else {
          try {
          const approve = new ethers.Contract( 
            approveUSDT,
            abiSecond,
            signer
          )
          const estimateGas = await approve.estimateGas.approve(icoAddress , ethers.utils.parseUnits(Price.current.value, 6));
          const approvedTx = {
            gasLimit: estimateGas.toString()
          }
          const approveTransaction = await approve.approve(icoAddress , ethers.utils.parseUnits(Price.current.value, 6), approvedTx);
          toast("Transaction is in progress", {
            position: toast.POSITION.TOP_CENTER,
            darkMode: true,
            autoClose: false,
            })
            await approveTransaction.wait();
            console.log(approveTransaction)
          const contract = new ethers.Contract(
            icoAddress,
            abi,
            signer
          );
          const price = ethers.utils.parseUnits(Price.current.value, 6);
          // const balance = ethers.utils.formatEther(
          //   await Provider.getBalance(signer.getAddress())
          // )
          // console.log(balance)
          // if (balance < price) {
          //   toast.error("Insufficient balance", {
          //     position: toast.POSITION.TOP_CENTER,
          //     darkMode: true,
          //   })
          //   return;
          // }
          const egas = await contract.estimateGas.buyTokens(account.address, price);
          const txbt = {
            gasLimit: egas.toString()
          }
          const buytokenTx = await contract.buyTokens(account.address, price, txbt);
          await buytokenTx.wait();

            toast.success("Transaction successful", {
                position: toast.POSITION.TOP_CENTER,
                darkMode: true,
            })
            Price.current.value = "";
          } catch (error) {
          console.log(error)
          toast.error("Transaction failed", {
            position: toast.POSITION.TOP_CENTER,
            darkMode: true,
          })
        }
      }
        
    }
  return (
    <>
    <section id="presale" >
    <CustomModal showModal={showModal} setShowModal={setShowModal} handleClose={handleClose} handleSuccess={handleSuccess}  />
    <ToastContainer toastClassName={
        "dark-toast"
    } />
    <div className="main_presale">
      <div>
          <h1 className="presale_title text-center">
            <span className="">
                LAST {" "}
            </span>
              Presale
          </h1>
      </div>
      <div className="presale_form_container">
        <div className="presale_details">
            {data.map((x, index) => (
                <div className="presale_details_item" key={index}>
                    <div className="presale_details_item_title">
                        <h5>
                        {x.title}
                        </h5>
                    </div>
                    <div className="presale_details_item_value">
                        <p>
                        {x.value}
                        </p>
                    </div>
                    </div>
            ))}
        </div>
        <div className="presale_form">
            <div className="form_inner">
                <label>Enter The Amount </label>
                <input type="text" placeholder="Enter the amount"  ref={Price} required />
            </div>
            <div className="form_inner">
                <label>Rate </label>
                <input type="text" placeholder="0.3 USDT" disabled />
            </div>
            <div className="btn" style={{width: "100%", marginTop: "1rem", borderRadius: "8px" }} onClick={purchase} >
                Purchase
              </div>
        </div>
      </div>
    </div>
    </section>
    </>
  );
};

export default PresaleForm;
