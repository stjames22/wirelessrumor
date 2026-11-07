import { ImageResponse } from 'next/og';
export const runtime='edge';
export const alt='WirelessRumor — AI is moving fast. Know what matters.';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function OpenGraphImage(){return new ImageResponse(
  <div style={{width:'100%',height:'100%',background:'linear-gradient(135deg,#080c13,#1b3150)',color:'#f5f4ef',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:72,fontFamily:'Arial,sans-serif'}}>
    <div style={{display:'flex',alignItems:'center',fontSize:32,fontWeight:900,letterSpacing:-1}}>WIRELESS<span style={{color:'#eaff75'}}>/</span>RUMOR</div>
    <div style={{display:'flex',flexDirection:'column',fontSize:86,fontWeight:900,letterSpacing:-4,lineHeight:1}}><span>AI IS MOVING FAST.</span><span style={{color:'#eaff75'}}>KNOW WHAT MATTERS.</span></div>
    <div style={{fontSize:24,color:'#bacbd7'}}>SOURCE-LED AI INTELLIGENCE · EVIDENCE · DEBATE</div>
  </div>,size);
}