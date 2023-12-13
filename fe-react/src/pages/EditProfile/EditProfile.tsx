import React from 'react';
import { useMutation } from 'react-query';
import LoadingIndicator from 'src/components/LoadingIndicator';
import { updateUserProfile } from 'src/helpers/api';
import { buildUserImageUrl } from 'src/helpers/utils';
import useUser from 'src/hooks/useUser';
import useUserId from 'src/hooks/useUserId';

const accentColors = [
  '0177d2',
  '01b4e4',
  '01c6ac',
  '01d277',
  '805be7',
  '959595',
  'd27701',
  'd29001',
  'd40242',
  'ea148c'
];

function EditProfile() {
  const { userId, hasLogin } = useUserId();

  const [selectedColor, setSelectedColor] = React.useState(0);
  const [changePassword, setChangePassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('');
  const [repeatPassword, setRepeatPassword] = React.useState('');

  const { data: user, isLoading } = useUser(userId);

  const { mutate: updateUser, isLoading: updateUserLoading } = useMutation(updateUserProfile);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== repeatPassword) {
      return;
    }
    const password = changePassword ? newPassword : user?.password_hash;
    updateUser({
      ...user,
      password_hash: password,
      picture_profile: buildUserImageUrl(user?.username, accentColors[selectedColor], 'fff')
    });
  };

  return (
    <form onSubmit={handleSubmit} className='px-24 py-3'>
      <h2 className='font-semibold text-2xl'>Edit Profile</h2>
      {isLoading && <LoadingIndicator />}
      <label htmlFor='username' className='block mt-4 text-lg'>
        Username
      </label>
      {!isLoading && (
        <input
          id='username'
          className='border-border border-1 py-1.5 mt-2'
          disabled
          type='text'
          value={user?.username}
        ></input>
      )}

      <div hidden={!changePassword}>
        <label htmlFor='new-pass' className='block mt-4 text-lg'>
          New Password
        </label>
        <input
          id='new-pass'
          className='border-border border-1 py-1.5 mt-2'
          placeholder='New Password'
          type='password'
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        ></input>
        <label htmlFor='repeat-pass' className='block mt-4 text-lg'>
          Repeat New Password
        </label>
        <input
          id='repeat-pass'
          className='border-border border-1 py-1.5 mt-2'
          placeholder='Repeat New Password'
          type='password'
          value={repeatPassword}
          onChange={e => setRepeatPassword(e.target.value)}
        />
      </div>
      <button
        type='button'
        onClick={() => setChangePassword(!changePassword)}
        className='block mt-4 px-4 py-1 mt-4 border-primary hover:bg-primary/10 border-2 rounded-md'
      >
        {!changePassword ? 'Change Password' : 'Cancel'}
      </button>

      <p className='block mt-4 text-lg'>Current Avatar</p>
      {!isLoading && (
        <img className='w-20 h-20 mt-2 rounded-full' src={user?.picture_profile} alt='Avatar'></img>
      )}
      <p className='block mt-4 text-lg'>Accent Color</p>
      <div className='flex justify-between'>
        {accentColors.map((color, index) => (
          <button
            key={index}
            type='button'
            onClick={() => setSelectedColor(index)}
            className={`w-14 h-14 mt-2 rounded-full hover:bg-[url('/src/assets/images/tick.svg')] bg-no-repeat bg-center cursor-pointer ${
              selectedColor === index ? `bg-[url('/src/assets/images/tick.svg')]` : ''
            } `}
            style={{ backgroundColor: `#${color}` }}
          />
        ))}
      </div>
      <button type='submit' className='primary-btn mt-4 px-4 py-1 mt-4'>
        {updateUserLoading && <LoadingIndicator />}
        {!updateUserLoading && 'Save'}
      </button>
    </form>
  );
}

export default EditProfile;
