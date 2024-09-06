import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { logout, selectCurrentUsername } from '@/features/auth/authSlice'
import { selectCurrentUser } from '@/features/users/usersSlice'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from './UserIcon'
import { fetchNotifications, selectUnreadNotificationsCount } from '@/features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useAppDispatch()
  const username = useAppSelector(selectCurrentUsername)
  const user = useAppSelector(selectCurrentUser)
  const numUnreadNotification = useAppSelector(selectUnreadNotificationsCount)
  const isLoggedIn = !!user
  let navContent: React.ReactNode = null
  if (isLoggedIn) {
    const onLogoutClicked = () => {
      dispatch(logout)
    }
    const fetchNewNotifications = () => {
      dispatch(fetchNotifications())
    }
    let unreadNotificationBadge: ReactNode | undefined
    if (numUnreadNotification > 0) {
      unreadNotificationBadge = <span className="badge">{numUnreadNotification}</span>
    }
    navContent = (
      <div className="navContent">
        <div className="navLinks">
          <Link to="/posts">Posts</Link>
          <Link to={'/users'}>Users</Link>
          <Link to="/notifications">Notifications {unreadNotificationBadge}</Link>
          <button className="button small" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
        <div className="userDetails">
          <UserIcon size={32} />
          {user.name}
          <button className="button small" onClick={onLogoutClicked}>
            Log Out
          </button>
        </div>
      </div>
    )
  }
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>
        {navContent}
      </section>
    </nav>
  )
}
