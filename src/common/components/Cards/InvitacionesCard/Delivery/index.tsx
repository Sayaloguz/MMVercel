import { FC } from "react";
import { MailOutlined } from "@ant-design/icons";
import Invitacion from "@/common/components/Invitacion/Delivery";
import { FullInvitation } from "@/common/types/utility";

interface InvitacionesCardProps {
  invitations: FullInvitation[];
}

const InvitacionesCard: FC<InvitacionesCardProps> = ({ invitations }) => {
  return (
    <div className="mb-5 bg-[#1c2331] text-white rounded-2xl shadow-xl border border-gray-700 w-full max-w-3xl mx-auto p-6 sm:p-8 px-4 sm:px-8 transition-all duration-300 flex flex-col justify-between">
      <div className="flex flex-col sm:flex-row sm:items-start gap-6">
        <h2 className="text-base sm:text-xl md:text-2xl font-bold flex items-center gap-2 mb-1">
          <MailOutlined className="shadowed-element" />
          Invitaciones pendientes <MailOutlined className="shadowed-element" />
        </h2>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {invitations.length > 0 ? (
          invitations.map((inv) => (
            <Invitacion key={inv.invitation.invId} invitation={inv} />
          ))
        ) : (
          <p className="text-gray-400">No tienes invitaciones pendientes.</p>
        )}
      </div>
    </div>
  );
};

export default InvitacionesCard;
