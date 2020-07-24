export const sendMail = async (email: string, message: string): Promise<any> => {
  console.debug(`Sending email to ${email} with message: ${message}`);
  console.info(`Mail sent to ${email}`);
};
